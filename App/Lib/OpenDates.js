import { 
    Linking, Platform} from 'react-native'
import moment from 'moment-with-locales-es6'
export default function open(date){
    if(Platform.OS === 'ios') {
        const referenceDate = moment.utc('2001-01-01');
        const secondsSinceRefDate = date.unix() - referenceDate.unix();
        Linking.openURL('calshow:' + secondsSinceRefDate);
      } else if(Platform.OS === 'android') {
        const msSinceEpoch = date.valueOf(); // milliseconds since epoch
        Linking.openURL('content://com.android.calendar/time/' + msSinceEpoch);
      }
}