import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import Colors from '../../Themes/Colors'
import Metrics from '../../Lib/Metrics'
export default StyleSheet.create({
  row:{
    flexDirection: 'row',
  },
  container:{
    height:Metrics.windowHeight*1/3,
    width:Metrics.windowWidth,
    backgroundColor:Colors.white
  },
  default:{
    margin: 8,
    backgroundColor: Colors.white,
    borderRadius: 10,
    height: 100,
    flexDirection:'row',
    flex: 1,
    overflow: 'hidden'
  },
  locTextContainer:{
    flex:0.8,
    justifyContent:'space-around',
    alignItems: 'center',
    marginLeft: 8,
    marginRight: 8,
  },
  iconContainer:{
    flex:0.2,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor:Colors.primary
  },
  locAddressText:{
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign:'center'
  },
  locationText:{
    color:Colors.primary,
  },
  mobileTextContainer:{
    flex:0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mobileText:{
    fontSize:30,
    fontWeight:'bold',
    textAlign:'center',
    // backgroundColor:'red'
  },
  guide:{
    alignSelf: 'center',
    position:'absolute',
    bottom:8
  }
})
