import firebase from 'react-native-firebase'
import notify from './notif'
export default async (message) => {
    notify(message);
    
    return Promise.resolve();
}