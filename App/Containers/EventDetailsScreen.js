import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, TouchableOpacity ,
Linking, Platform} from 'react-native'
import { connect } from 'react-redux'
import styles from './Styles/EventDetailsScreenStyle'
import { View } from 'react-native-animatable';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import otron from 'reactotron-react-native'
import moment from 'moment-with-locales-es6'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import Colors from '../Themes/Colors';
import openMap from '../Lib/OpenMaps'
import I18n from 'react-native-i18n'
import RNCalendarEvents from 'react-native-calendar-events'


class EventDetailsScreen extends Component {

  static navigationOptions = {
    title: 'Events Manager',
    header: null
  };
  constructor(props) {
    super(props)
    this.state = {
      event: props.navigation.state.params.event
    }
    // otron.log(props)

  }

  componentWillMount() {
    this.props.navigation.setParams({ title: 'Update Event' })
  }

  //region Action
  _locationAction =location=>{
    const { longitude, name, latitude, address } = location
    openMap({
      latitude,
      longitude, 
      zoomLevel:5,
      name})
  }
  _callAction = mobile=>{
    mobile = mobile.replace(' ','')
    Linking.openURL(`tel:${mobile}`)
  }
  _saveEvent = (event)=>{
    const { time, date, location, title, desc } = event
    RNCalendarEvents.saveEvent(title, {
      startDate: date,
      endDate: date
    })
    if(Platform.OS === 'ios') {
      const referenceDate = moment.utc('2001-01-01');
      const secondsSinceRefDate = date.unix() - referenceDate.unix();
      Linking.openURL('calshow:' + secondsSinceRefDate);
    } else if(Platform.OS === 'android') {
      const msSinceEpoch = date.valueOf(); // milliseconds since epoch
      Linking.openURL('content://com.android.calendar/time/' + msSinceEpoch);
    }
  }
  //endregion


  //region Render
  _renderLocation= location=>{
    const { longitude, name, latitude, address } = location
    return(<TouchableOpacity style={styles.default} onPress={()=>{this._locationAction(location)}}>
      <View style={styles.locTextContainer}>
        <Text style={styles.locAddressText}>{address}</Text>
        <Text style={styles.locationText}>{`${latitude},${longitude}`}</Text>
        <Text>{I18n.t('event/viewlocation')}</Text>
      </View>
      <View style={styles.iconContainer}>
        <FAIcon name={'map-marker'} size={50} color={Colors.white} />
      </View>
    </TouchableOpacity>)
  }
  _renderContact = mobile =>{
    return(
      <TouchableOpacity style={styles.default} onPress={()=>{this._callAction(mobile)}}> 
        <View style={styles.iconContainer}>
          <FAIcon name={'phone'} size={50} color={Colors.white} />
      </View>
      <View style={styles.mobileTextContainer} >
        <Text style={styles.mobileText}>{mobile}</Text>
        <Text style={styles.guide}>{I18n.t('event/call')}</Text>
      </View>
      </TouchableOpacity>
    )
  }

  _renderSchedule = (event) => {
    return(
      <TouchableOpacity style={styles.default} onPress={()=>{this._saveEvent(event)}}> 
        <View style={styles.iconContainer}>
          <FAIcon name={'phone'} size={50} color={Colors.white} />
      </View>
      <View style={styles.iconContainer}>
          <FAIcon name={'phone'} size={50} color={Colors.white} />
      </View>
      </TouchableOpacity>
    )
  }
  //endregion

  render() {
    const { time, date, location, title, desc } = this.state.event
    const m = moment(date).locale('fr').format('DD/MMMM/YYYY').split('/')
    const day = m[0]
    const month = m[1].replace('.', '').toUpperCase()
    const year = m[2]
    

    return (
      <ScrollView>
        {this._renderLocation(location)}
        {this._renderContact('+230 7527187')}
        {this._renderSchedule(this.state.event)}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailsScreen)
