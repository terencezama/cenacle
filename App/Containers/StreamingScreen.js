import React, { Component } from 'react'
import { View, Text, Slider, TouchableOpacity, DeviceEventEmitter } from 'react-native'
import styles from './Styles/StreamingScreenStyle'
import { ToastModule, RadioStreamModule } from '../NativeModules';
import params from '../Services/Globals';
import otron from 'reactotron-react-native';
import Utils from '../Services/Utils';

class StreamingScreen extends Component {

    constructor(props){
        super(props)

        this.state = { 
            isPlaying: false,
            loading: false,
            progressStr: '00:00',
            durationStr: '00:00',
            progress: 0,
            duration: 0,
            currentPosition: 0,
            mediaUrls: [
                {
                    title: 'Genese 1',
                    url: 'https://audio.emcitv.com/audio/bible/fr/audio-bible/AT/genese/genese-01.mp3'
                },
                {
                    title: 'Genese 2',
                    url: 'https://audio.emcitv.com/audio/bible/fr/audio-bible/AT/genese/genese-02.mp3'
                },
                {
                    title: 'Genese 3',
                    url: 'https://audio.emcitv.com/audio/bible/fr/audio-bible/AT/genese/genese-03.mp3'
                }
            ]
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
            this.setState({
                durationStr: Utils.convertMillisToTime(value),
                duration:value
            });
        }else if(type === "progress"){
            otron.log(`Percent ${this.state.duration}`)
            this.setState({
                progress: value,
                progressStr: Utils.convertMillisToTime(value)
            });
        }
    };

    //When pressing on Play/Pause Button
    _onButtonRadioActionPressed(){ 
        if(this.state.isPlaying){
            this.setState({isPlaying: false})
            RadioStreamModule.pauseRadio()
        }else{
            const { mediaUrls, currentPosition } = this.state;
            const { url } = mediaUrls[currentPosition];

            this.setState({loading: true})
            RadioStreamModule.playRadio(url)
            ToastModule.show("Playing Radio", ToastModule.SHORT)
        }
    }

    //Seek the native media player
    _onSeek(value){
        RadioStreamModule.seekTo(value);
    }

    _onButtonNextPressed(){
        let { currentPosition, mediaUrls } = this.state;
        const urlsCount = (mediaUrls.length -1);
        if(currentPosition < urlsCount ){
            currentPosition++;
        }else if(currentPosition === urlsCount){
            currentPosition = 0;
        }

        this.setState({ currentPosition: currentPosition});
        this._changeTrack(currentPosition);
    }

    _onButtonPreviousPressed(){
        let { currentPosition, mediaUrls } = this.state;
        if(currentPosition > 0){
            //go to previous url
            currentPosition--;
        }else if(currentPosition === 0){
            //go to last url
            currentPosition = (mediaUrls.length -1)
        }

        this.setState({ currentPosition: currentPosition});
        this._changeTrack(currentPosition);
    }

    _changeTrack(trackNumber){
        this.setState({
            progressStr: '00:00',
            durationStr: '00:00',
            progress: 0,
            duration: 0,
        })

        const { url } = this.state.mediaUrls[trackNumber];
        if(this.state.isPlaying){
            this.setState({ loading: true })
            RadioStreamModule.playRadio(url)
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

    _renderTrackTitle(){
        const { mediaUrls, currentPosition } = this.state;
        const { title } = mediaUrls[currentPosition];
        return(
            <Text style={styles.titleText}>
                {title}
            </Text>
        )
    }

  render() {    
    return (
      <View style={styles.container}>

        {this._renderTrackTitle()}

        <View style={styles.horizontalContainer}>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => this._onButtonPreviousPressed()}
                >
                <Text style={styles.buttonText}>
                    Prev
                </Text>
            </TouchableOpacity>

            {this._renderButtonAction()}

            <TouchableOpacity 
                style={styles.button}
                onPress={() => this._onButtonNextPressed()}>
                <Text style={styles.buttonText}>
                    Next
                </Text>
            </TouchableOpacity>

        </View>

        <Slider
            minimumValue={0}
            maximumValue={this.state.duration}
            step={1}
            value={this.state.progress}
            onValueChange={(value) => this._onSeek(value)}
        />

        <View style={styles.horizontalContainer}>
            <Text style={styles.progressText}>
                {this.state.progressStr}
            </Text>

            <Text style={styles.progressText}>
                {this.state.durationStr}
            </Text>

        </View>
      </View>
    )
  }
}

export default StreamingScreen
