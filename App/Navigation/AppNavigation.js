import { StackNavigator } from 'react-navigation'
import TextInputsScreen from '../Containers/TextInputsScreen'
import MenuNavigator from './DrawerNavigation'
import OnboardingScreen from '../Containers/OnboardingScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import EventDetailsScreen from '../Containers/EventDetailsScreen'
import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  TextInputsScreen: { screen: TextInputsScreen },
  OnboardingScreen: { screen: OnboardingScreen },
  LaunchScreen: { screen: LaunchScreen },
  EventDetailsScreen : {screen: EventDetailsScreen},
  Menu:{screen: MenuNavigator}
}, {
  // Default config for all screens
  headerMode: 'float',
  initialRouteName: 'Menu',
  navigationOptions: {
    headerStyle: styles.header,
  
    

  }
})

export default PrimaryNav
