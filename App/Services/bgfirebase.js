import firebase from 'react-native-firebase'
export default async (message) => {
    // handle your message
    console.log("fcm", message);
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
        .android.setSmallIcon('notif');
    firebase.notifications().displayNotification(notification)
    
    return Promise.resolve();
}