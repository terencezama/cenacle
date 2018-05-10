import { StyleSheet } from 'react-native'
import Colors from '../../Themes/Colors'
export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    // marginTop: -5,
    // height:49

  },
  text: {
    marginLeft: 16,
    marginTop: 16,
    marginBottom: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
})
