import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import PropTypes from 'prop-types';
import { View, Text, ActivityIndicator } from 'react-native'
import styles from './Styles/LoadingViewStyle'

export default class LoadingView extends Component {
  // // Prop type warnings
  static propTypes = {
    // someProperty: PropTypes.object,
    loading: PropTypes.bool.isRequired,
  }
  //
  // Defaults for props
  static defaultProps = {
    loading: false
  }

  render() {
    const { loading} = this.props
    if(!loading){
      return null
    }else{
      return (
        <View style={styles.container}>
          <View style={styles.indicatorContainer}>
            <View style={styles.indicator} />
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.text}>{'Chargement ...'}</Text>
          </View>
        </View>
      )
    }
    
  }
}
