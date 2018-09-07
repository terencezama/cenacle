// import './App/Config/ReactotronConfig'
// import { AppRegistry } from 'react-native'
// import App from './App/Containers/App'
// import firebase from 'react-native-firebase'
// import bgfirebase from './App/Services/bgfirebase'
// import notify from './App/Services/notif'
// AppRegistry.registerComponent('cenacle', () => App)
// AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgfirebase);

// // Build a channel
// const channel = new firebase.notifications.Android.Channel('cenacle-channel', 'cenacle-channel', firebase.notifications.Android.Importance.Max)
//   .setDescription('cenacle-channel');
// // Create the channel
// firebase.notifications().android.createChannel(channel);

// firebase.messaging().getToken()
//     .then(fcmToken => {
//         if (fcmToken) {
//             // user has a device token
//             console.log("token", fcmToken);
//         } else {
//             // user doesn't have a device token yet
//         }
//     });
// firebase.messaging().subscribeToTopic("all");
// if(__DEV__){
//     firebase.messaging().subscribeToTopic("debug"); 
// }
// firebase.messaging().onMessage((message) => {
//     console.log("fcm-inapp", message);
//     notify(message);

// });