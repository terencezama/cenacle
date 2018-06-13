import React, { Component } from 'react'
import { FlatList, View, Text, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment-with-locales-es6'
import Toast, { DURATION } from 'react-native-easy-toast'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import NotifyActions from '../Redux/NotifyRedux'

// Styles
import styles from './Styles/EventsManagerScreenStyle'
import firebase from 'react-native-firebase'

import AwesomeIcon from 'react-native-vector-icons/FontAwesome'

class SharesManagerScreen extends Component {
  static navigationOptions = {
    title: 'Shares Manager',
  };
  //region Initializing
  constructor(props) {
    super(props)
    this.ref = firebase.firestore().collection('cenacle').doc('app').collection('shares').orderBy('date', 'desc')

    this.unsubscribe = null;
    this.state = {
      items: []
    }
  }
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  onCollectionUpdate = (querySnapshot) => {
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push({
        key: doc.id,
        ...doc.data(), // DocumentSnapshot
      });
    });
    this.setState({
      items,
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
  _deleteItem = (item) => {
    const { key } = item.item;

    firebase.firestore().collection('cenacle').doc('app').collection('shares').doc(key).delete().then(function () {

    }).catch(function (error) {
      console.log(error)
    });
  }
  _editAction = (item) => {
    this.props.navigation.navigate('EventFormEditScreen', {
      update: item,
      title: 'Update'
    })
  }
  _uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  _notifAction = (item) => {
    let message = {
      to:"cMYm3g9GeaA:APA91bHSzL99lKl3U_jw6zl_2AeoPKbqxmpm3UI8O7eq9hBT3TzmjMLIXbPbh7SMoxOxMSGdAnJfSkvCFG8YC_GXKOIfzuLyp7cqblL46TWy2VI0BFUrII4H9A_6arD8bUAERHzZVAa7",
      data:{
        type:"notif",
        message:"Je taime",
        title:"Lina"
      },
      priority:"high"
    }

    console.log(message);
    this.props.pnotify(message);
  }
  //endregion

  //region Flatlist
  _renderItem = (item, index) => {
    const { date, time, title, content } = item.item;

    console.log("item", item)
    return (
      <View style={styles.item}>
        <View style={[styles.itemContainer, { flex: 0.6 }]}>
          <View style={styles.dateContent}>
            <Text style={styles.dateText}>{moment(date).format('DD/MM/YY')}</Text>
            <Text style={styles.timeText}>{moment(date).format('h:mm a')}</Text>
          </View>
          <View style={styles.contentView}>
            <Text style={styles.titleText}>{title}</Text>
            <Text numberOfLines={2} ellipsizeMode='tail' style={styles.descText}>{content}</Text>
          </View>
        </View>
        <View style={[styles.actionView, { flex: 0.4 }]}>
          <TouchableOpacity style={styles.notifView} onPress={() => { this._notifAction(item) }}>
            <AwesomeIcon size={30} name='bell' color={'white'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.editView} onPress={() => { this._editAction(item) }}>
            <AwesomeIcon size={30} name='edit' color={'white'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteView} onPress={() => { this._deleteAction(item) }}>
            <AwesomeIcon size={30} name='trash' color={'white'} />
          </TouchableOpacity>
        </View>
        <Toast ref="toast" position="center" />
      </View>
    )

  }
  //endregion

  render() {
    const { items } = this.state
    return (
      <FlatList
        data={items}
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
    pnotify  :(body)=>dispatch(NotifyActions.notifyRequest(body)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SharesManagerScreen)
