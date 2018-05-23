import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text,
TouchableOpacity, Animated } from 'react-native'
import styles from './Styles/PanelStyle'
import {Colors} from '../Themes'
// import FAIcon from 'react-native-vector-icons/FontAwesome'

export default class Panel extends Component {
  // // Prop type warnings
  static propTypes = {
    title: PropTypes.string.isRequired
  }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }
  state = {
    height: new Animated.Value(48),  // Initial value for opacity: 0
    expanded: false
  }


  _onPress = ()=>{
    let expanded = !this.state.expanded
    this.setState({expanded:expanded})
    Animated.timing(                  // Animate over time
      this.state.height,            // The animated value to drive
      {
        toValue: expanded?400:48,                   // Animate to opacity: 1 (opaque)
        duration: 300,              // Make it take a while
      }
    ).start(); 
  }
  render() {
    const {title} = this.props
    let { height } = this.state;
    return (
      <TouchableOpacity style={styles.cell} onPress={()=>{this._onPress()}}>
        <Animated.View 
        style={{
          backgroundColor: Colors.white,
          justifyContent: 'center',
          height: height,         // Bind opacity to animated value
        }}
        >
          <Text style={styles.cellText}>{title}</Text>
        </Animated.View>
        <View style={styles.cellBr} />
      </TouchableOpacity>
    )
  }
}
