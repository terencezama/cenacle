import { StyleSheet } from 'react-native'
import {Colors} from '../../Themes/'
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  // cell style
  cell: {
    // height: 50,
    backgroundColor: Colors.transparent,
  },
  cellText: {
    fontSize: 18,
    color: Colors.body,
    marginLeft: 8,
  },
  cellBr: {
    height: 2,
    backgroundColor: Colors.background,
  }
})
