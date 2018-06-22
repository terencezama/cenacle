import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './Styles/StreamingScreenStyle'
import { ToastModule } from '../NativeModules';

class StreamingScreen extends Component {

    constructor(props){
        super(props)

        this.state = {
            isPlaying: false,
            loading: false
        }
    }

    //When pressing on Play/Pause Button
    _onButtonRadioActionPressed(){ 

        ToastModule.show("Playing Radio", ToastModule.SHORT)

        if(this.state.isPlaying){
            //this.setState({isPlaying: false})
            //RadioStreamModule.pauseRadio()
        }else{
            //this.setState({loading: true})
            //RadioStreamModule.playRadio(params.RADIO_URL)
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
