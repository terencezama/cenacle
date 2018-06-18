import './App/Config/ReactotronConfig'
import { AppRegistry } from 'react-native'
import App from './App/Containers/App'
import firebase from 'react-native-firebase'
import bgfirebase from './App/Services/bgfirebase'

AppRegistry.registerComponent('cenacle', () => App)
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgfirebase);

// Build a channel
const channel = new firebase.notifications.Android.Channel('cenacle-channel', 'cenacle-channel', firebase.notifications.Android.Importance.Max)
  .setDescription('cenacle-channel');
// Create the channel
firebase.notifications().android.createChannel(channel);

firebase.messaging().getToken()
    .then(fcmToken => {
        if (fcmToken) {
            // user has a device token
            console.log("token", fcmToken);
        } else {
            // user doesn't have a device token yet
        }
    });
firebase.messaging().subscribeToTopic("all");

firebase.messaging().onMessage((message) => {
    // Process your message as required
    const { data } = message
    console.log("fcm-inapp", data);
    const notification = new firebase.notifications.Notification()
        .setNotificationId('notificationId')
        .setTitle(data.title)
        .setBody(data.message);
    notification
        .android.setChannelId('cenacle-channel')
        .android.setPriority(1)
        .android.setVibrate([1000,1000])
        .android.setDefaults([firebase.notifications.Android.Defaults.Vibrate])
        .android.setSmallIcon('notif');
    firebase.notifications().displayNotification(notification)

});