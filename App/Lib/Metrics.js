import {Dimensions,Platform,StatusBar} from 'react-native'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Platform.OS === 'ios'? Dimensions.get('window').height: Dimensions.get('window').height - StatusBar.currentHeight;

export default {
    windowWidth,
    windowHeight
}