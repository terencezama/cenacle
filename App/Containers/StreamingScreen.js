import React, { Component } from 'react'
import { View, Text } from 'react-native'
import styles from './Styles/StreamingScreenStyle'


class StreamingScreen extends Component {

  render() {    
    return (
      <View style={styles.container}>
        <Text>
            Stream
        </Text>
      </View>
    )
  }
}

export default StreamingScreen
