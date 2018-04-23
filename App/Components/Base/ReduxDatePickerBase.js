import Colors from '../../Themes/Colors'
import React, { Component } from 'react';
import { View, Text, TouchableOpacity,Keyboard } from 'react-native';
import {
  Jiro,
} from 'react-native-textinput-effects';
import DateTimePicker from 'react-native-modal-datetime-picker';
import otron from 'reactotron-react-native'
import moment from 'moment-with-locales-es6'

export default class ReduxDatePickerBase extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDateTimePickerVisible: false,
    };
  }
  _showDateTimePicker = () => {
    Keyboard.dismiss()
    this.setState({ isDateTimePickerVisible: true });
    
  }
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
  _handleDatePicked = (date) => {
    const { input, meta, } = this.props;
    otron.log(`A date has been picked: \n${JSON.stringify(date)}`);
    this._hideDateTimePicker();


    input.onChange(date)
  };

  _formatedDate(date) {
    const m = moment(date)
    // m.locale('fr')
    return m.format('DD MMM YYYY').replace('.', '').toUpperCase()
  }

  render() {
    const { input, meta, } = this.props;
    return (
      <View>
        <TouchableOpacity onPress={this._showDateTimePicker}>
          <Jiro
            editable={false}
            pointerEvents="none"
            borderColor={Colors.primary}
            inputStyle={{ color: 'white' }}
            // onChangeText={input.onChange}
            // onBlur={input.onBlur}
            // onFocus={this._showDateTimePicker}

            value={input.value instanceof Date?this._formatedDate(input.value):input.value}
            {...this.props}
            disable
            onPress={this._showDateTimePicker}
          />
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          mode="date"
        />
      </View>
    );
  }


}



