import React, { Component } from 'react'
import {
  FlatList, Text
} from 'react-native'
import { connect } from 'react-redux'
import i18n from 'react-native-i18n'
import EventItem from '../Components/EventItem'
import firebase from 'react-native-firebase'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/EventMemberScreenStyle'
import otron from 'reactotron-react-native'
import { Colors } from '../Themes';
class EventMemberScreen extends Component {
  static navigationOptions = {
    title: i18n.t('screenEventMemberTitle'),
  };

  constructor(props) {
    super(props)
    this.ref = firebase.firestore().collection('member_events').orderBy('values.date','asc')

    this.unsubscribe = null;
    this.state = {
      events: []
    }
  }
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  onCollectionUpdate = (querySnapshot) => {
    let events = [];
    querySnapshot.forEach((doc) => {
      events.push({
        key: doc.id,
        ...doc.data().values, // DocumentSnapshot
      });
    });
    // otron.log(events)
    let expired = []
    let nonExpired = []
    const cdate = new Date()
    /*
    const date = moment(adate).format('MMM/DD/YYYY').split('/')
    const month = date[0].toUpperCase().replace('.', '');
    const day = date[1]
    const year = date[2]
    */
    for (const event of events) {
      const date = new Date(event.date);
      if(date.getDate() < cdate.getDate()){
        event.expired = true
        expired.push(event);
      }else{
        nonExpired.push(event);
      }
    }
    expired = expired.reverse();
    events = [
      ...nonExpired,
      ...expired
    ]
    this.setState({
      events,
      loading: false,
    });

  }

  //region FlatList
  _onCellPress = (item, index) => {
    this.props.navigation.navigate('EventDetailsScreen', { event: item, color: item.expired?Colors.expired:Colors.flatRed })

  }
  //endregion

  render() {
    const { events } = this.state
    return (
      <FlatList
        data={events}
        renderItem={({ item, index }) => <EventItem color={Colors.flatRed} onPress={() => { this._onCellPress(item, index) }} index={index} data={item} />}
        keyExtractor={(item, index) => index}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(EventMemberScreen)
