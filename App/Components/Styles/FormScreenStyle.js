import { StyleSheet, Dimensions, StatusBar, Platform } from 'react-native'
import { ApplicationStyles,Colors } from '../../Themes/'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Platform.OS === 'ios'? Dimensions.get('window').height: Dimensions.get('window').height - StatusBar.currentHeight;
const imageHeight = 0.4*windowHeight;
export default StyleSheet.create({
  container:{
    width:windowWidth,
    height:windowHeight,
    backgroundColor:Colors.white
  },
  iconContainer:{
    position:'absolute',
    width: 100,
    height: 100,
    borderRadius: 100/2,
    backgroundColor: Colors.primary,
    right: (windowWidth-100)/2,
    top: imageHeight*0.9-50,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  section1:{
    flex:0.4,
    backgroundColor:Colors.white,
  },
  section2:{
    flex:0.6,
    backgroundColor:Colors.white,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  headerImage:{
    width:windowWidth,
    height:imageHeight

  },
  formView:{
    flex:1-0.14,
    // backgroundColor:'red'
  },
  actionView:{
    flex:0.14,
    // alignSelf: 'flex-end',
    backgroundColor:Colors.white,
    justifyContent:'center',
    marginRight: 16,
    marginLeft: 16,
  }
  // ...ApplicationStyles.screen
})
