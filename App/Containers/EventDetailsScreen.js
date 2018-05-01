import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/EventDetailsScreenStyle'
import { View } from 'react-native-animatable';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import otron from 'reactotron-react-native'
import moment from 'moment-with-locales-es6'

class EventDetailsScreen extends Component {

  static navigationOptions = {
    title: 'Events Manager',
  };
  constructor(props) {
    super(props)
    this.state = {
      event: props.navigation.state.params.event
    }
    otron.log(props)

  }

  componentWillMount(){
    this.props.navigation.setParams({title:'Update Event'})
  }
  render() {
    const { time, date, location, title, desc } = this.state.event
    const m = moment(date).locale('fr').format('DD/MMMM/YYYY').split('/')
    const day = m[0]
    const month = m[1].replace('.', '').toUpperCase()
    const year = m[2]

    

    return (
      <ScrollView>
        <View style={styles.container}>
        <View style={styles.dateContainer}>
            <View style={styles.row}>
              <Text style={styles.dateText}>{day}</Text>
              <Text style={styles.dateText}>{month}</Text>
            </View>
            <Text style={styles.dateText}>{year}</Text>
          </View>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>{title}</Text>
            </View>
            
          </View>
          


          <View style={styles.body}>
            <Text>{desc}</Text>
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{time}</Text>
            </View>
          </View>
          {/* <MapView
        style={styles.container}
          // provider={PROVIDER_GOOGLE}cd 
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        /> */}
        </View>
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
