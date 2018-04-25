import React, { Component } from 'react'
import { FlatList, View, Text, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment-with-locales-es6'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/EventsManagerScreenStyle'
import firebase from 'react-native-firebase'
import otron from 'reactotron-react-native'
import AwesomeIcon from 'react-native-vector-icons/FontAwesome'

class EventsManagerScreen extends Component {
  static navigationOptions = {
    title: 'Events Manager',
  };
  //region Initializing
  constructor(props) {
    super(props)
    this.ref = firebase.firestore().collection('events').orderBy('values.date', 'asc')

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
  //endregion

  //region Item Action 
  _deleteAction = (item) => {
    Alert.alert('Delete', 'Are you sure you want to delete this Event.',
      [
        { text: 'OK', onPress: () => { this._deleteItem(item) }, style: 'destructive' },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: false }
    )

  }
  _deleteItem(item) {
    const { key } = item.item;
    otron.log(item);
    firebase.firestore().collection('events').doc(key).delete().then(function () {
      otron.log("Document successfully deleted!");
    }).catch(function (error) {
      otron.error("Error removing document: ", error);
    });
  }
  _editAction = (item) => {
    this.props.navigation.navigate('EventFormEditScreen',{
      update:item,
      title:'Update'
    })
  }
  //endregion

  //region Flatlist
  _renderItem = (item, index) => {

    const { date, time, title, desc } = item.item;
    return (
      <View style={styles.item}>
        <View style={styles.itemContainer}>
          <View style={styles.dateContent}>
            <Text style={styles.dateText}>{moment(date).format('DD/MM/YY')}</Text>
            <Text style={styles.timeText}>{time}</Text>
          </View>
          <View style={styles.contentView}>
            <Text style={styles.titleText}>{title}</Text>
            <Text numberOfLines={2} ellipsizeMode='tail' style={styles.descText}>{desc}</Text>
          </View>
        </View>
        <View style={styles.actionView}>
          <TouchableOpacity style={styles.editView} onPress={()=>{this._editAction(item)}}>
            <AwesomeIcon size={30} name='edit' color={'white'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteView} onPress={() => { this._deleteAction(item) }}>
            <AwesomeIcon size={30} name='trash' color={'white'} />
          </TouchableOpacity>
        </View>
      </View>
    )

  }
  //endregion

  render() {
    const { events } = this.state
    return (
      <FlatList
        data={events}
        renderItem={this._renderItem}
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

export default connect(mapStateToProps, mapDispatchToProps)(EventsManagerScreen)
