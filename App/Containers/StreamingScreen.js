import React, { Component } from 'react'
import { View, Text, TouchableOpacity, DeviceEventEmitter } from 'react-native'
import styles from './Styles/StreamingScreenStyle'
import { ToastModule, RadioStreamModule } from '../NativeModules';
import params from '../Services/Globals';

class StreamingScreen extends Component {

    constructor(props){
        super(props)

        this.state = {
            isPlaying: false,
            loading: false
        }
    }

    //This component will listen to events sent from the native module
    componentWillMount(){
        DeviceEventEmitter.addListener(params.BROADCAST_ACTION, this.handleRadioStramModuleEvents.bind(this));
    }

    handleRadioStramModuleEvents = (event) => {

        if(event.action === params.PLAY_RADIO){
            this.setState({isPlaying: true, loading:false})
        }else if(event.action === params.PAUSE_RADIO){
            this.setState({isPlaying: false})
        }else{
            ToastModule.show("Error Streaming", ToastModule.SHORT)
            this.setState({isPlaying: false, loading: false})
        }
    };

    //When pressing on Play/Pause Button
    _onButtonRadioActionPressed(){ 

        if(this.state.isPlaying){
            this.setState({isPlaying: false})
            RadioStreamModule.pauseRadio()
        }else{
            this.setState({loading: true})
            RadioStreamModule.playRadio(params.STREAMING_URL)
            ToastModule.show("Playing Radio", ToastModule.SHORT)
        }
    }

    //Display Play or Pause Button depending of the state
    _renderButtonAction(){
        let actionText = "";

        if(this.state.loading){
            return(
                <Text>Loading</Text>
            )
        }

        if(this.state.isPlaying){
            actionText = "Pause";
        }else{
            actionText = "Play";
        }

        return(
            <TouchableOpacity 
                style={styles.button}
                onPress={() => this._onButtonRadioActionPressed()}
                >
                <Text style={styles.buttonText}>
                    {actionText}
                </Text>
            </TouchableOpacity>
        )
    }

  render() {    
    return (
      <View style={styles.container}>

        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
                Prev
            </Text>
        </TouchableOpacity>

        {this._renderButtonAction()}

        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
                Next
            </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default StreamingScreen
