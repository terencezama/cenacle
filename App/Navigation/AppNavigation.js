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
  ForgetScreen: { screen: ForgetScreen },
  RegisterScreen: { screen: RegisterScreen },
  LoginScreen: { screen: LoginScreen },
  TextInputsScreen: { screen: TextInputsScreen },
  OnboardingScreen: { screen: OnboardingScreen },
  LaunchScreen: { screen: LaunchScreen },
  EventDetailsScreen : {screen: EventDetailsScreen},
  Menu:{screen: MenuNavigator},
  EventFormEditScreen: {screen:EventFormScreen}
}, {
  // Default config for all screens
  headerMode: 'float',
  initialRouteName: 'OnboardingScreen',
  key:'login',
  navigationOptions: {
    headerStyle: styles.header,
  
    

  }
})

export default PrimaryNav
