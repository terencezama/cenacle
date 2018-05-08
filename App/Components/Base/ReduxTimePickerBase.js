import Colors from '../../Themes/Colors'
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  Hoshi,
} from 'react-native-textinput-effects';
import DateTimePicker from 'react-native-modal-datetime-picker';
import otron from 'reactotron-react-native'
import moment from 'moment-with-locales-es6'

export default class ReduxTimePickerBase extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDateTimePickerVisible: false,
    };
  }
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
  _handleDatePicked = (date) => {
    const { input, meta, } = this.props;
    // otron.log(`A Time has been picked: ${date}`);
    this._hideDateTimePicker();

    const m = moment(date)
    m.locale('fr')
    let str = m.format('hh:mm A').replace('.','').toUpperCase()
    input.onChange(str)
  };

  render() {
    const { input, meta, } = this.props;
    return (
      <View>
        <TouchableOpacity onPress={this._showDateTimePicker}>
          <Hoshi
            editable={false}
            pointerEvents="none"
            borderColor={Colors.primary}
            // onChangeText={input.onChange}
            // onBlur={input.onBlur}
            // onFocus={this._showDateTimePicker}

            value={input.value}
            {...this.props}
            disable
            onPress={this._showDateTimePicker}
          />
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          mode="time"
        />
      </View>
    );
  }


}



