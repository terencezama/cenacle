import { StackNavigator } from 'react-navigation'
import styles from './Styles/NavigationStyles'
import BiblePageScreen from '../Containers/BiblePageScreen'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  BiblePageScreen: { screen: BiblePageScreen }
}, {
  // Default config for all screens
  headerMode: 'float',
  initialRouteName: 'BiblePageScreen',
  key:'root',
  navigationOptions: {
    headerStyle: styles.header,
  }
})

export default PrimaryNav
