import React, { Component } from 'react'
import {
  ScrollView, Text, KeyboardAvoidingView,
  TouchableOpacity, VirtualizedList
} from 'react-native'
import PropTypes from 'prop-types'
import FAIcon from 'react-native-vector-icons/FontAwesome';
import styles from './Styles/BibleHistoryScreenStyle'
import { View } from 'react-native-animatable';
import { ListItem } from 'react-native-elements';
import { RNBibleRealm } from 'react-native-bible-realm'
import { Colors } from '../Themes';
import moment from 'moment-with-locales-es6'

class BibleHistoryScreen extends Component {

  state = {
    itemCount: 0
  }

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onSelected: PropTypes.func.isRequired
  }

  componentWillMount(){
    RNBibleRealm.fetchHistories().then(result=>{
      this.result = result;
      // console.log('history size', result.length)
      this.setState({
        itemCount:result.length
      })
    })
  }


  _renderHeader = () => {
    return (
      <View style={styles.navbar}>
        <Text style={styles.titleText}>History </Text>
        <TouchableOpacity style={styles.iconContainer} onPress={() => { this.props.onClose() }}>
          <FAIcon name={'close'} color="#fff" size={30} size={15} />
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const {itemCount} = this.state
    
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
            const dateStr =  moment(date).format('MMMM Do YYYY, h:mm:ss a')
            return (
              <ListItem
              component={TouchableOpacity}
                key={item.key}
                title={item.title}
                subtitle={dateStr}
                rightIcon={{ name: "arrow-back"}}
                onPress={()=>{
                  this.props.onSelected(item.chapterId)
                }}
                subtitleStyle={{
                  color:Colors.primary
                }}
              />
            );
          }}
        />
      </View>
    )
  }
}



export default BibleHistoryScreen
