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
import styles from './Styles/EventScreenStyle'
import otron from 'reactotron-react-native'
class EventScreen extends Component {
  static navigationOptions = {
    title: i18n.t('screenEventTitle'),
  };

  constructor(props) {
    super(props)
    this.ref = firebase.firestore().collection('events').orderBy('values.date','asc')

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
    const events = [];
    querySnapshot.forEach((doc) => {
      events.push({
        key: doc.id,
        ...doc.data().values, // DocumentSnapshot
      });
    });
    otron.log(events)
    this.setState({
      events,
      loading: false,
    });

  }

  //region FlatList
  _onCellPress = (item, index) => {
    this.props.navigation.navigate('EventDetailsScreen', { event: item })

  }
  //endregion

  render() {
    const { events } = this.state
    return (
      <FlatList
        data={events}
        renderItem={({ item, index }) => <EventItem onPress={() => { this._onCellPress(item, index) }} index={index} data={item} />}
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

export default connect(mapStateToProps, mapDispatchToProps)(EventScreen)
