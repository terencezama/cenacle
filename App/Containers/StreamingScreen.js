import React, { Component } from 'react'
import { View, Text, TouchableOpacity, DeviceEventEmitter } from 'react-native'
import styles from './Styles/StreamingScreenStyle'
import { ToastModule, RadioStreamModule } from '../NativeModules';
import params from '../Services/Globals';
import otron from 'reactotron-react-native'

class StreamingScreen extends Component {

    constructor(props){
        super(props)

        this.state = {
            isPlaying: false,
            loading: false,
            progess: '0:00',
            duration: '0:00'
        }
    }

    //This component will listen to events sent from the native module
    componentWillMount(){
        DeviceEventEmitter.addListener(params.BROADCAST_ACTION, this.handleRadioStreamModuleEvents.bind(this));
    }

    handleRadioStreamModuleEvents = (event) => {
        const { type, value } = event.action;
        if(type === "action"){
            if(value === params.PLAY_RADIO){
                this.setState({isPlaying: true, loading:false})
            }else if(value === params.PAUSE_RADIO){
                this.setState({isPlaying: false})
            }else{
                ToastModule.show(`Error playing the file`, ToastModule.SHORT)
            }
        }else if(type === "duration"){
            this.setState({duration: value})
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

    _onButtonGetProgressPressed(){
        RadioStreamModule.getPlayerDuration();
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
        <View style={styles.horizontalContainer}>
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

            <TouchableOpacity 
                style={styles.button}
                onPress={() => this._onButtonGetProgressPressed()}>
                <Text style={styles.buttonText}>
                    Progess
                </Text>
            </TouchableOpacity>

        </View>

        <View style={styles.horizontalContainer}>
            <Text style={styles.progressText}>
                {this.state.progess}
            </Text>

            <Text style={styles.progressText}>
                {this.state.duration}
            </Text>

        </View>
      </View>
    )
  }
}

export default StreamingScreen
