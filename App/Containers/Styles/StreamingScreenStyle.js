import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes/'

export default StyleSheet.create({
  container:{
    backgroundColor:Colors.white,
    margin: 4,
    borderRadius: 10,
  },
  horizontalContainer:{
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: 'red',
    borderRadius: 10,
    margin: 5,
    padding: 5
  },
  buttonText:{
    color: '#fff',
    fontSize: 20
  },
  progressText:{
    color: '#000',
    textAlign: 'center',
    fontSize:20
  }
})
