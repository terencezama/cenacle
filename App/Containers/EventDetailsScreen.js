import React, { Component } from 'react'
import {
  ScrollView, Text, KeyboardAvoidingView, TouchableOpacity,
  Linking, Platform
} from 'react-native'
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
import openDate from '../Lib/OpenDates'

class EventDetailsScreen extends Component {

  static navigationOptions = {
    title: 'Details',

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
  _locationAction = location => {
    const { longitude, name, latitude, address } = location
    openMap({
      latitude,
      longitude,
      zoomLevel: 5,
      name
    })
  }
  _callAction = mobile => {
    mobile = mobile.replace(' ', '')
    Linking.openURL(`tel:${mobile}`)
  }
  _saveEvent = (event) => {
    const { time, date, location, title, desc } = event
    const t = time.split(' ')
    const hm = t[0].split(':')
    const hour = (t[1].toLowerCase() == 'pm') ? parseInt(hm[0]) + 12 : parseInt(hm[0])
    const min = parseInt(hm[1])

    let diff = 0
    let delta = 7
    if (hour > delta) {
      diff = hour - delta
    } else {
      diff = delta - hour
    }


    otron.log(diff)

    let eventStartDate = new Date(date.setHours(hour, min))
    //13-x=7
    RNCalendarEvents.saveEvent(title, {
      startDate: eventStartDate,
      endDate: eventStartDate,
      alarms: [{
        date: diff * 60
      }]
    })

    openDate(eventStartDate)

  }
  //endregion


  //region Render
  _renderLocation = location => {
    if (location == null || location == undefined) {
      return null
    }
    const { longitude, name, latitude, address } = location
    return (<TouchableOpacity style={styles.default} onPress={() => { this._locationAction(location) }}>
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
  _renderContact = mobile => {
    if (mobile == null || mobile == undefined) {
      return null
    }
    return (
      <TouchableOpacity style={styles.default} onPress={() => { this._callAction(mobile) }}>
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
    const { time, date: adate, location, title, desc } = event
    const date = moment(adate).format('MMM/DD/YYYY').split('/')
    const month = date[0].toUpperCase().replace('.', '');
    const day = date[1]
    const year = date[2]
    return (
      <TouchableOpacity style={styles.default} onPress={() => { this._saveEvent(event) }}>
        <View style={styles.iconContainer}>
          <Text style={styles.scheduleDayText}>{day}</Text>
          <Text style={styles.scheduleMonthText}>{month}</Text>
        </View>
        <View style={styles.scheduleYearContainer}>
          <Text style={styles.scheduleYearText}>{year}</Text>
        </View>
        <View style={styles.scheduleTimeContainer}>
          <Text style={styles.scheduleTimeText}>{time}</Text>
          <Text style={styles.guide}>{I18n.t('event/schedule')}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  //endregion

  render() {
    const { time, date, location, title, desc, contact } = this.state.event


    return (
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.contentText}>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.descText}>{desc}</Text>
          </View>
        </View>
        {this._renderLocation(location)}
        {this._renderContact(contact)}
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
