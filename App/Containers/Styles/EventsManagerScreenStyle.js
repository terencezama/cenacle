import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import Colors from '../../Themes/Colors'
export default StyleSheet.create({
  item:{
    flexDirection: 'row',
    flex: 1,
    marginTop: 4,
  },
  actionView:{
    flex:0.3,
    flexDirection: 'row',
  },
  notifView:{
    flex:1,
    backgroundColor:Colors.flatGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editView:{
    flex:1,
    backgroundColor:Colors.flatBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteView:{
    flex:1,
    backgroundColor:Colors.flatRed,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer:{
    flex:0.7,
    // height: 75,
    backgroundColor: 'white',
    
    justifyContent:'space-between',
    marginLeft: 8,
  },
  dateContent:{
    flexDirection: 'row',
    marginTop: 8,
    marginLeft: 8,
  },
  dateText:{
    fontWeight: 'bold',
    color:Colors.coal,
  },
  timeText:{
    marginLeft: 8,
    color:Colors.primary,
  },
  contentView:{
    marginBottom: 8,
    marginLeft: 8,
  },
  titleText:{
    fontWeight: 'bold',
    color:Colors.coal,
    marginTop:8,
  },
  descText:{
    // height:30
  }
})
