import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes/'

export default StyleSheet.create({
  container:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor:Colors.white,
    margin: 4,
    borderRadius: 10,
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
  }
})
