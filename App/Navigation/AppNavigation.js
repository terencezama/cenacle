import { StackNavigator } from 'react-navigation'
import TextInputsScreen from '../Containers/TextInputsScreen'
import EventFormScreen from '../Containers/EventFormScreen'
import EventDetailsScreen from '../Containers/EventDetailsScreen'
import EventScreen from '../Containers/EventScreen'
import OnboardingScreen from '../Containers/OnboardingScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  TextInputsScreen: { screen: TextInputsScreen },
  EventFormScreen: { screen: EventFormScreen },
  EventDetailsScreen: { screen: EventDetailsScreen },
  EventScreen: { screen: EventScreen },
  OnboardingScreen: { screen: OnboardingScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'float',
  initialRouteName: 'EventFormScreen',
  navigationOptions: {
    headerStyle: styles.header,
  
    

  }
})

export default PrimaryNav
