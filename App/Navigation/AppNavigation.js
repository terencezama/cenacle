import { StackNavigator } from 'react-navigation'
import ForgetScreen from '../Containers/ForgetScreen'
import RegisterScreen from '../Containers/RegisterScreen'
import LoginScreen from '../Containers/LoginScreen'
import TextInputsScreen from '../Containers/TextInputsScreen'
import MenuNavigator from './DrawerNavigation'
import OnboardingScreen from '../Containers/OnboardingScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import EventDetailsScreen from '../Containers/EventDetailsScreen'
import styles from './Styles/NavigationStyles'
import EventFormScreen from '../Containers/EventFormScreen'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  forget: { screen: ForgetScreen },
  register: { screen: RegisterScreen },
  login: { screen: LoginScreen },
  TextInputsScreen: { screen: TextInputsScreen },
  OnboardingScreen: { screen: OnboardingScreen },
  LaunchScreen: { screen: LaunchScreen },
  EventDetailsScreen : {screen: EventDetailsScreen},
  menu:{screen: MenuNavigator},
  EventFormEditScreen: {screen:EventFormScreen}
}, {
  // Default config for all screens
  headerMode: 'float',
  initialRouteName: 'OnboardingScreen',
  key:'root',
  navigationOptions: {
    headerStyle: styles.header,
  
    

  }
})

export default PrimaryNav
