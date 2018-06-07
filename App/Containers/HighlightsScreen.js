import React, { Component } from 'react'
import {
  ScrollView, Text, KeyboardAvoidingView,
  TouchableOpacity, VirtualizedList
} from 'react-native'
import PropTypes from 'prop-types'
import FAIcon from 'react-native-vector-icons/FontAwesome';
import styles from './Styles/HighlightsScreenStyle'
import { View } from 'react-native-animatable';
import { Card, Button } from 'react-native-elements';
import { RNBibleRealm } from 'react-native-bible-realm'
import { Colors } from '../Themes';
import moment from 'moment-with-locales-es6'

class HighlightsScreen extends Component {

  state = {
    itemCount: 0
  }

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onSelected: PropTypes.func.isRequired
  }

  componentWillMount() {
    RNBibleRealm.fetchHighlights().then(result => {
      this.result = result;
      // console.log('history size', result.length)
      this.setState({
        itemCount: result.length
      })
    })
  }


  _renderHeader = () => {
    return (
      <View style={styles.navbar}>
        <Text style={styles.titleText}>Highlights </Text>
        <TouchableOpacity style={styles.iconContainer} onPress={() => { this.props.onClose() }}>
          <FAIcon name={'close'} color="#fff" size={30} size={15} />
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { itemCount } = this.state

    return (
      <View style={styles.container}>
        {this._renderHeader()}
        <VirtualizedList
          data={[]}
          getItemCount={(data) => itemCount}
          getItem={(data, index) => {
            return this.result[index];
          }}
          keyExtractor={(item, index) => {
            return index;
          }}
          renderItem={({ item, index }) => {
            const date = Date.parse(item.date)
            const dateStr = moment(date).format('MMMM Do YYYY, h:mm:ss a')
            let data = item.data
            // data = data.replace(/(<sup(.*?)sup>)|(<.*?>)/g, "")
            data = data.replace(/(<.*?>)/g, "")
            return (
              <TouchableOpacity style={styles.itemContainer} onPress={()=>{
                // console.log(item)
                this.props.onSelected(item.chapterId)
              }}>
                <Text style={styles.itemBody}>{data}</Text>
                <Text style={styles.itemDesc}>{item.title+"."+item.verseIndex}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    )
  }
}



export default HighlightsScreen
