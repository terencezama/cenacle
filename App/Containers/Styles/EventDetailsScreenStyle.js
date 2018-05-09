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
    minHeight: 100,
    flexDirection:'row',
    flex: 1,
    overflow: 'hidden'
  },
  content:{
    margin: 8,
    backgroundColor: Colors.white,
    borderRadius: 10,
    minHeight: 100,
    flexDirection:'column',
    flex: 1,
    overflow: 'hidden'
  },
  contentText:{
    margin: 8,
  },
  titleText:{
    fontSize:18,
    fontWeight:'bold'
  },
  descText:{
    fontSize:16,
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
  },
  scheduleYearContainer:{
    // ...this.iconContainer,
    // flex:0.3
    flex:0.3,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor:Colors.primary
  },
  scheduleTimeContainer:{
    // ...this.iconContainer,
    // flex:0.3
    flex:0.5,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor:Colors.white
  },
  scheduleDayText:{
    color:Colors.white,
    fontSize:30,
    fontWeight:'bold'
  },
  scheduleMonthText:{
    color:Colors.white,
    fontSize:18,
    fontWeight:'bold'
  },
  scheduleYearText:{
    color:Colors.white,
    fontSize:30,
    fontWeight:'bold'
  },
  scheduleTimeText:{
    color:Colors.primary,
    fontSize:30,
    fontWeight:'bold'
  }
})
