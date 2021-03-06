import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes/'

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    margin: 4,
    borderRadius: 10,
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    // backgroundColor: 'red',
    // borderRadius: 10,
    // margin: 5,
    // padding: 5,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 20,
    marginRight: 4,
    marginLeft: 4,
  },
  titleText: {
    color: '#000',
    fontSize: 15,
    margin: 10,
    fontWeight: '700'
  },
  buttonText: {
    color: '#fff',
    fontSize: 20
  },
  progressText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 20
  }
})
