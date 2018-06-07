import React, { Component } from 'react'
import {
  View,
  VirtualizedList,
  Text
} from 'react-native'
import { connect } from 'react-redux'
import i18n from 'react-native-i18n'
import styles from './Styles/ShareScreenStyle'
import { Card } from 'react-native-elements'
import moment from 'moment-with-locales-es6'
import firebase from 'react-native-firebase'
// import RichTextView from 'react-native-richtextview'
import RichText from '../Components/RichText'
import { Colors } from '../Themes';

class ShareScreen extends Component {
  static navigationOptions = {
    title: i18n.t('screenShareTitle'),
    tintColor: '#000'
  };

  constructor(props) {
    super(props)
    this.ref = firebase.firestore().collection('cenacle').doc('app').collection('shares').orderBy('date', 'desc')

    this.unsubscribe = null;
    this.state = {
      shares: []
    }
  }


  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  onCollectionUpdate = (querySnapshot) => {
    const shares = [];
    querySnapshot.forEach((doc) => {
      // console.log('snap',doc.data())
      shares.push({
        key: doc.id,
        ...doc.data(), // DocumentSnapshot
      });
    });
    // otron.log(events)
    console.log('shares length', shares.length)
    this.setState({
      shares,
      loading: false,
    });

  }

  render() {
    const { shares } = this.state
    return (
      <View style={{ flex: 1, backgroundColor: Colors.background }}>

        <VirtualizedList
          data={[]}
          getItemCount={(data) => shares.length}
          getItem={(data, index) => {
            // const $ = cheerio.load('<h2 class="title">Hello world</h2>')
            // console.log('cheerio',$.children())
            return shares[index];
          }}
          keyExtractor={(item, index) => {
            return index;
          }}
          renderItem={({ item, index }) => {
            
            return (
              <View style={styles.container}>
                <RichText style={styles.item} item={item}/>
              </View>
              // <Text>{`<h2>${item.title}</h2>${item.content}`}</Text>


            );
          }}

        />
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(ShareScreen)
