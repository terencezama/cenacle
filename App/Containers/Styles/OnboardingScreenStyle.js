import { StyleSheet, Dimensions, StatusBar, Platform } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Platform.OS === 'ios'? Dimensions.get('window').height: Dimensions.get('window').height - StatusBar.currentHeight;
const imageHeight = 0.4*windowHeight;
export default StyleSheet.create({
  container:{
    width:windowWidth,
    height:windowHeight,
    backgroundColor:'white',
    justifyContent:'space-around',
    alignItems: 'center',

  },
  image:{
    // width:windowWidth,
    // height:windowHeight,
    flex:0.8,
    margin: 8,
  },
  textContainer:{
    marginRight: 8,
    marginLeft: 8,
    justifyContent:'center',
  },
  text:{
    fontSize: 24,
    textAlign:'center'
  }

})
