import { StyleSheet } from 'react-native'
import Colors from '../../Themes/Colors'
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  cell:{
    backgroundColor: 'white',
    minHeight: 100,
    margin: 8,
    marginBottom: 0,
    // justifyContent:'space-between',
    flexDirection: 'row',
    flex:1,
  },
  dateView:{
    flex: 0.3,
    backgroundColor:Colors.flatRed,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  dayText:{
    color:Colors.white,
    fontSize:50,
    fontWeight: 'bold',
    
    marginBottom: -15,
  },
  monthText:{
    color:Colors.white,
    fontWeight: 'bold',
    fontSize:35,
    backgroundColor:Colors.transparent
  },
  componentView:{
    flex:0.7,
    backgroundColor:Colors.white
  },
  componentSubview:{
    flex:1,
    margin: 8,
    // backgroundColor:Colors.cloud
  },
  titleText:{
    fontSize:18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  descText:{

  },
  iconContainer:{
    position: 'absolute', 
    top: 0,
    right: 8, 
    bottom: 0, 
    justifyContent: 'center',
    opacity:0.7,
  }
  
})
