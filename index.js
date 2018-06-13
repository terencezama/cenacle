import './App/Config/ReactotronConfig'
import { AppRegistry } from 'react-native'
import App from './App/Containers/App'
import firebase from 'react-native-firebase'
AppRegistry.registerComponent('cenacle', () => App)
firebase.messaging().getToken()
  .then(fcmToken => {
    if (fcmToken) {
      // user has a device token
      console.log("token",fcmToken);
    } else {
      // user doesn't have a device token yet
    } 
  });