import React, { Component } from 'react'
import { FlatList, View, Text, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment-with-locales-es6'
import Toast, {DURATION} from 'react-native-easy-toast'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

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
  _deleteItem= (item) => {
    const { key } = item.item;

    firebase.firestore().collection('cenacle').doc('app').collection('shares').doc(key).delete().then(function () {
      
    }).catch(function (error) {
      console.log(error)
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
    const { date, time, title, content } = item.item;

    console.log("item",item)
    return (
      <View style={styles.item}>
        <View style={[styles.itemContainer,{flex:0.6}]}>
          <View style={styles.dateContent}>
            <Text style={styles.dateText}>{moment(date).format('DD/MM/YY')}</Text>
            <Text style={styles.timeText}>{moment(date).format('h:mm a')}</Text>
          </View>
          <View style={styles.contentView}>
            <Text style={styles.titleText}>{title}</Text>
            <Text numberOfLines={2} ellipsizeMode='tail' style={styles.descText}>{content}</Text>
          </View>
        </View>
        <View style={[styles.actionView,{flex:0.4}]}>
          {/* <TouchableOpacity style={styles.notifView} onPress={()=>{this._editAction(item)}}>
            <AwesomeIcon size={30} name='bell' color={'white'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.editView} onPress={()=>{this._editAction(item)}}>
            <AwesomeIcon size={30} name='edit' color={'white'} />
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.deleteView} onPress={() => { this._deleteAction(item) }}>
            <AwesomeIcon size={30} name='trash' color={'white'} />
          </TouchableOpacity>
        </View>
        <Toast ref="toast" position="center"/>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SharesManagerScreen)
