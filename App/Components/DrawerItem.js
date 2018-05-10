import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './Styles/DrawerItemStyle'
import { Colors } from '../Themes';

export default class DrawerItem extends Component {
  // // Prop type warnings
  static propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
  }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render () {
    const {onPress, item:{title,active}} = this.props
    return (
      <TouchableOpacity style={[styles.container,{backgroundColor:active?Colors.cloud:Colors.white}]} onPress={onPress}>
        <Text style={[styles.text,active?{color:Colors.primary}:{color:Colors.body}]} >{title}</Text>
      </TouchableOpacity>
    )
  }
}
