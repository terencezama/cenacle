import { StyleSheet,Dimensions,StatusBar,Platform } from 'react-native'
const screenHeight  = Platform.OS == 'ios'?Dimensions.get('window').height : Dimensions.get('window').height - StatusBar.currentHeight
const screenWidth   = Dimensions.get('window').width;
export default StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 0,
    left: 0,
    height: screenHeight,
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',

  },
  indicatorContainer:{
    justifyContent: 'center',
    width: 150,
    height: 150,
    alignItems: 'center',
  },
  indicator:{
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    height:'100%',
    width:'100%',
    backgroundColor: 'black',
    opacity: 0.7,
    borderRadius: 10,
  },
  text:{
    marginTop: 8,
    color:'white',
    fontSize: 18,
  }
})
