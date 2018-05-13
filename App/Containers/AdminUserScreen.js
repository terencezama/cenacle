import React, { Component } from 'react'
import {
  ScrollView, Text, KeyboardAvoidingView,
  FlatList
} from 'react-native'
import { connect } from 'react-redux'
// import * as admin from 'firebase-admin'
// var admin = require('firebase-admin');
import styles from './Styles/AdminUserScreenStyle'
import K from '../Services/Globals'
class AdminUserScreen extends Component {
  static navigationOptions = {
    title: 'Admin User'
  };

  _initFirebase() {
    // this.app = admin.initializeApp({
    //   credential: admin.credential.cert(K.firebase_service),
    //   databaseURL: "https://terence-838bd.firebaseio.com"
    // });
  }

  componentWillMount() {
    this._initFirebase()
  }

  render() {
    return (
      <FlatList
        data={[{ key: 'a' }, { key: 'b' }]}
        renderItem={({ item }) => <Text>{item.key}</Text>}
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminUserScreen)
