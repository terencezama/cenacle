import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import Colors from '../../Themes/Colors'
export default StyleSheet.create({
  row:{
    flexDirection: 'row',
  },
  container:{
    flex:1,
    backgroundColor:Colors.white
  },
  header:{
    // flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  titleContainer:{
    flex:0.8,
    backgroundColor:Colors.white,
  },
  titleText:{
    fontSize: 30,
    fontWeight: 'bold',
    color:Colors.charcoal
  },
  dateContainer:{
    flex:0.2,
    backgroundColor:Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dateText:{
    color:Colors.primary,
    fontSize:50,
    fontWeight:'bold',
  },
  timeContainer:{
    // flex:0.2,
    backgroundColor:Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText:{
    color:Colors.white,
    fontSize:35,
    fontWeight:'bold'
  },
  body:{

  }
})
