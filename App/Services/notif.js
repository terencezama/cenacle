import firebase from 'react-native-firebase'
import {Platform} from 'react-native'
const notify = (message) => {
    const { data } = message
    const notification = new firebase.notifications.Notification()
        .setNotificationId('notificationId')
        .setTitle(data.title)
        .setBody(data.message);

    if(Platform.Version < 21 ){
        notification.android.setPriority(2)
    }else{
        notification.android.setPriority(1)
    }
    notification
        .android.setChannelId('cenacle-channel')
        .android.setVibrate([1000,1000])
        .android.setDefaults([firebase.notifications.Android.Defaults.Vibrate])
        .android.setSmallIcon('notif');
    firebase.notifications().displayNotification(notification)
}
export default notify