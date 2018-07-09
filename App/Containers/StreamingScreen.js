import React, { Component } from 'react'
import { View, Text, Slider, TouchableOpacity, DeviceEventEmitter } from 'react-native'
import styles from './Styles/StreamingScreenStyle'
import { ToastModule, RadioStreamModule } from '../NativeModules';
import params from '../Services/Globals';
import Utils from '../Services/Utils';
import RNFS from 'react-native-fs';
import MIcon from 'react-native-vector-icons/MaterialIcons'
import { PropTypes } from 'prop-types';

const root = 'https://audio.emcitv.com/audio/bible/fr/audio-bible/'
const audioMap =
    {
        "fra-LSG:Gen": "genese",
        "fra-LSG:Exod": "exode",
        "fra-LSG:Lev": "levitique",
        "fra-LSG:Num": "nombres",
        "fra-LSG:Deut": "deuteronome",
        "fra-LSG:Josh": "josue",
        "fra-LSG:Judg": "juges",
        "fra-LSG:Ruth": "ruth",
        "fra-LSG:1Sam": "1-samuel",
        "fra-LSG:2Sam": "2-samuel",
        "fra-LSG:1Kgs": "1-rois",
        "fra-LSG:2Kgs": "2-rois",
        "fra-LSG:1Chr": "1-chroniques",
        "fra-LSG:2Chr": "2-chroniques",
        "fra-LSG:Ezra": "esdras",
        "fra-LSG:Neh": "nehemie",
        "fra-LSG:Esth": "esther",
        "fra-LSG:Job": "job",
        "fra-LSG:Ps": "psaumes",
        "fra-LSG:Prov": "proverbes",
        "fra-LSG:Eccl": "ecclesiaste",
        "fra-LSG:Song": "cantique-des-cantiques",
        "fra-LSG:Isa": "esaie",
        "fra-LSG:Jer": "jeremie",
        "fra-LSG:Lam": "lamentations",
        "fra-LSG:Ezek": "ezechiel",
        "fra-LSG:Dan": "daniel",
        "fra-LSG:Hos": "osee",
        "fra-LSG:Joel": "joel",
        "fra-LSG:Amos": "amos",
        "fra-LSG:Obad": "abdias",
        "fra-LSG:Jonah": "jonas",
        "fra-LSG:Mic": "michee",
        "fra-LSG:Nah": "nahum",
        "fra-LSG:Hab": "habakuk",
        "fra-LSG:Zeph": "sophonie",
        "fra-LSG:Hag": "aggee",
        "fra-LSG:Zech": "zacharie",
        "fra-LSG:Mal": "malachie",
        "fra-LSG:Matt": "matthieu",
        "fra-LSG:Mark": "marc",
        "fra-LSG:Luke": "luc",
        "fra-LSG:John": "jean",
        "fra-LSG:Acts": "actes",
        "fra-LSG:Rom": "romains",
        "fra-LSG:1Cor": "1-corinthiens",
        "fra-LSG:2Cor": "2-corinthiens",
        "fra-LSG:Gal": "galates",
        "fra-LSG:Eph": "ephesiens",
        "fra-LSG:Phil": "philippiens",
        "fra-LSG:Col": "colossiens",
        "fra-LSG:1Thess": "1-thessaloniciens",
        "fra-LSG:2Thess": "2-thessaloniciens",
        "fra-LSG:1Tim": "1-timothee",
        "fra-LSG:2Tim": "2-timothee",
        "fra-LSG:Titus": "tite",
        "fra-LSG:Phlm": "philemon",
        "fra-LSG:Heb": "hebreux",
        "fra-LSG:Jas": "jacque",
        "fra-LSG:1Pet": "1-pierre",
        "fra-LSG:2Pet": "2-pierre",
        "fra-LSG:1John": "1-jean",
        "fra-LSG:2John": "2-jean",
        "fra-LSG:3John": "3-jean",
        "fra-LSG:Jude": "jude",
        "fra-LSG:Rev": "apocalypse"
    }

class StreamingScreen extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isPlaying: false,
            loading: false,
            progressStr: '00:00',
            durationStr: '00:00',
            progress: 0,
            duration: 0,
            currentPosition: 0,
            isCurrentFileSaved: false,
            isDownloadingFile: false,
            currentDownloadTotalSize: 0,
            currentDownloadProgress: 0,
            currentDownloadJobId: 0,
        }
    }

    getCurrentUrl = () => {
        return this.getUrl(this.props)
    }
    getUrl =(props) => {
        const { index: { version, book, chapter,ord } } = props
        const bookId = `${version}:${book}`

        let chapterString = "";
        let chapterNum = parseInt(chapter);
        if (chapterNum < 10) {
            chapterString = "0" + chapterNum;
        } else {
            chapterString = chapterNum;
        }
        let bookString = audioMap[bookId];
        let testament = ord >= 40 ? "NT/": "AT/"
        let url = root + testament + bookString + "/" + bookString + "-" + chapterString + ".mp3"
        return url
    }

    //This component will listen to events sent from the native module
    componentWillMount() {
        DeviceEventEmitter.addListener(params.BROADCAST_ACTION, this.handleRadioStreamModuleEvents.bind(this));
        RNFS.mkdir(`${RNFS.ExternalDirectoryPath}/cenacleAudio/`).then((result) => {
            // ToastModule.show("dir created Successfully", ToastModule.SHORT);
        }).catch((error) => {
            ToastModule.show("Saving requires External Directory", ToastModule.SHORT);
        });
    }

    //Check if current file is saved
    componentDidMount() {
        let { currentPosition, mediaUrls } = this.state;
        // const { url } = mediaUrls[currentPosition];
        // this._checkFileStatus(url);
    }

    shouldComponentUpdate(nextProps) {
        // console.log("updating",this.props.index);
        const {isPlaying} = this.state
        if(this.props.index !== nextProps.index){
            const url = this.getUrl(nextProps);
            console.log("updating", url);
            this._checkFileStatus(url);
            this._changeTrack(url)
            return false
        }
        return true
      }


    //check if current file is saved locally. Using url to identify the file
    _checkFileStatus(url) {
        this._isFileSaved(url)
            .then((found) => {
                this.setState({ isCurrentFileSaved: found });
            })
    }

    //handle events received from native codes
    handleRadioStreamModuleEvents = (event) => {
        const { type, value } = event.action;

        if (type === "action") {
            // otron.log(`TYPE: ${type} - ${value}`)
                ; if (value === params.PLAY_RADIO) {
                    this.setState({ isPlaying: true, loading: false })
                } else if (value === params.PAUSE_RADIO) {
                    this.setState({ isPlaying: false })
                } else if (value === params.RADIO_FINISHED) {
                    //current audio completed
                    //play next file
                    // this._onButtonNextPressed();
                    this.props.nextChapter();
                } else {
                ToastModule.show(`Error playing the file`, ToastModule.SHORT)
            }
        } else if (type === "duration") {
            this.setState({
                durationStr: Utils.convertMillisToTime(value),
                duration: value
            });
        } else if (type === "progress") {
            this.setState({
                progress: value,
                progressStr: Utils.convertMillisToTime(value)
            });
        }
    };

    //When pressing on Play/Pause Button
    _onButtonRadioActionPressed() {
        if (this.state.isPlaying) {
            this.setState({ isPlaying: false })
            RadioStreamModule.pauseRadio()
        } else {
            // const { mediaUrls, currentPosition } = this.state;
            // const { url } = mediaUrls[currentPosition];

            const url = this.getCurrentUrl()



            
            this.setState({loading: true})

            if(this.state.isCurrentFileSaved){
                let filePath = `${RNFS.ExternalDirectoryPath}/cenacleAudio/${this._getFileNameFromUrl(url)}`;
                RadioStreamModule.playRadio(url, true, filePath)
            }else{
                RadioStreamModule.playRadio(url, false, null)
            }
            
        }
    }

    //Seek the native media player
    _onSeek(value) {
        console.log("seek",value)
        RadioStreamModule.seekTo(value);
    }

    /**
     * For saving downloaded file, need a file name
     */
    _getFileNameFromUrl(url) {

        let urlArr = url.split('/');

        return urlArr[(urlArr.length - 1)];
    }

    /**
     * This function has 2 roles.
     * 1. Show/Hide icon to save file
     * 2. When play is pressed, if file present locally, play it
     */
    _isFileSaved(url) {

        let found = false;

        const fileName = this._getFileNameFromUrl(url);
        const audioDirectory = `${RNFS.ExternalDirectoryPath}/cenacleAudio/`;

        return new Promise((resolve, reject) => {
            RNFS.readDir(audioDirectory)
                .then((result) => {
                    result.forEach(file => {
                        if (file.name === fileName) {
                            found = true;
                        }
                    })

                    resolve(found);
                })
                .catch((err) => {
                    reject(`Error CODE: ${err.code} `);
                });
        })
    }

    /**
     *  REGION Download File
     */
    _onButtonSavePressed() {
        let { currentPosition, mediaUrls } = this.state;
        const url = this.getCurrentUrl()

        const fileName = this._getFileNameFromUrl(url);

        const audioDirectory = `${RNFS.ExternalDirectoryPath}/cenacleAudio/`;

        RNFS.downloadFile(
            {
                fromUrl: url,
                toFile: `${audioDirectory}${fileName}`,
                begin: this._downloadBeginCallback,
                progress: this._downloadProgressCallback,
                progressDivider: 5
            }
        ).promise.then(() => {
            this._resetDownload();
            ToastModule.show("File Saved Successfully", ToastModule.SHORT);
            this._checkFileStatus(url)
        }
        ).catch(e => {
            this._resetDownload();
            ToastModule.show(`Error saving the file : ${e}`, ToastModule.SHORT);
        })
    }

    _resetDownload = () => {
        this.setState({
            isDownloadingFile: false,
            currentDownloadTotalSize: 0,
            currentDownloadProgress: 0,
            currentDownloadJobId: 0,
        });
    }

    _downloadBeginCallback = (data) => {
        const { jobId, contentLength } = data;
        let totalSize = Utils.bytesToSize(contentLength);

        this.setState({
            isDownloadingFile: true,
            currentDownloadJobId: jobId,
            currentDownloadTotalSize: totalSize,
        })
    }

    _downloadProgressCallback = (data) => {
        const { jobId, contentLength, bytesWritten } = data;

        let progress = Utils.bytesToSize(bytesWritten);
        this.setState({
            currentDownloadProgress: progress
        });
    }

    /**
     * End Region Download File
     */
    _onButtonDeletePressed() {
        const url = this.getCurrentUrl()

        const fileName = this._getFileNameFromUrl(url);

        const audioDirectory = `${RNFS.ExternalDirectoryPath}/cenacleAudio/`;

        return RNFS.unlink(`${audioDirectory}${fileName}`)
            .then(() => {
                //refresh the view save/delete
                this._checkFileStatus(url);
            })
            // `unlink` will throw an error, if the item to unlink does not exist
            .catch((err) => {
                ToastModule.show(`Error Deleting the file ${err.message}`, ToastModule.SHORT);
            });
    }

    _changeTrack(url) {

        //cancel any ongoing downloads

        if (this.state.isDownloadingFile) {
            RNFS.stopDownload(this.state.currentDownloadJobId);
            this._onButtonDeletePressed();
        }

        // if(this.state.loading){
        //     RadioStreamModule.pauseRadio()
        // }

        this.setState({
            progressStr: '00:00',
            durationStr: '00:00',
            progress: 0,
            duration: 0,
        })
       
        if (this.state.isPlaying || this.state.loading) {
            this.setState({ loading: true });

            this._isFileSaved(url)
                .then((found) => {
                    if (found) {
                        // otron.log(`Saved`)
                        let filePath = `${RNFS.ExternalDirectoryPath}/cenacleAudio/${this._getFileNameFromUrl(url)}`;
                        RadioStreamModule.playRadio(url, true, filePath)
                    } else {
                        // otron.log(`Not Saved`)
                        RadioStreamModule.playRadio(url, false, null)
                    }
                })
        }

        this._checkFileStatus(url);
    }
    //Display Play or Pause Button depending of the state
    _renderButtonAction() {
        let actionText = "";

        if (this.state.loading) {
            return (
                <Text>Loading</Text>
            )
        }

        if (this.state.isPlaying) {
            actionText = "pause";
        } else {
            actionText = "play-arrow";
        }

        return (
            <TouchableOpacity
                style={styles.button}
                onPress={() => this._onButtonRadioActionPressed()}
            >
                <MIcon name={actionText} size={30} color={'white'} />
            </TouchableOpacity>
        )
    }

    _renderTrackTitle() {
        const { mediaUrls, currentPosition } = this.state;
        const { title } = mediaUrls[currentPosition];
        return (
            <Text style={styles.titleText}>
                {title}
            </Text>
        )
    }

    _renderButtonSave() {
        if (this.state.isCurrentFileSaved) {
            return (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this._onButtonDeletePressed()}>
                    <MIcon name="delete" size={30} color={'white'} />
                </TouchableOpacity>
            );
        }

        if (this.state.isDownloadingFile) {
            return (
                <Text>
                    {this.state.currentDownloadProgress}/{this.state.currentDownloadTotalSize}
                </Text>
            );
        }

        return (
            <TouchableOpacity
                style={styles.button}
                onPress={() => this._onButtonSavePressed()}>
                <MIcon name="save" size={30} color={'white'} />
            </TouchableOpacity>
        );
    }

    render() {
        if (!this.props.visible) return null

        return (
            <View style={styles.container}>

                {/* {this._renderTrackTitle()} */}

                <View style={styles.horizontalContainer}>


                    {this._renderButtonAction()}

                    {this._renderButtonSave()}

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
StreamingScreen.propTypes = {
    index: PropTypes.object.isRequired,
}
export default StreamingScreen
