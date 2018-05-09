import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './Styles/EventItemStyle'
// import {Icon, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment-with-locales-es6';
import Colors from '../Themes/Colors'


export default class EventItem extends Component {
  // Prop type warnings
  /*
  */
  static propTypes = {
    data: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
  }
  //
  // Defaults for props
  // static defaultProps = {
  //   data: {}
  // }
  _color = () => {
    return Colors.primary
  }

  _dateView = (datestr) => {
    // moment.locale('fr')
    const date = moment(datestr).format('MMM/DD/YYYY').split('/')
    const month = date[0].toUpperCase().replace('.', '');
    const day = date[1]
    const year = date[2]
    const { index } = this.props;
    return (
      <View style={[styles.dateView, { backgroundColor: this._color() }]}>
        <Text style={styles.dayText}>{day}</Text>
        <Text style={styles.monthText}>{month}</Text>
      </View>
    )
  }

  render() {
    const { data, onPress } = this.props
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.cell}>
            {this._dateView(data.date)}
            <View style={styles.componentView}>
              <View style={styles.componentSubview}>
                <Text style={styles.titleText}>{data.title}</Text>
                <Text numberOfLines={2} style={styles.descText}>{data.desc}</Text>
                <Text  style={[styles.descText,{color:this._color()}]}>{data.time}</Text>
                <View style={styles.iconContainer}>
                  {/* <Icon
                    name='map-marker'
                    size={60}
                    color={this._color()}
                  /> */}
                </View>

              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}
