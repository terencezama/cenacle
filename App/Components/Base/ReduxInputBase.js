import React from 'react';
import { View, Text } from 'react-native';
import {
  Hoshi,
} from 'react-native-textinput-effects';
import otron from 'reactotron-react-native'
/**
 * to be wrapped with redux-form Field component
 */
import Colors from '../../Themes/Colors'
export default function ReduxInputBase(props) {
  const { input, meta, } = props;
  // otron.log(meta)
  // otron.log(input)
  // if(input.value == '' && ){
  //   input.value = meta.initial
  // }


  return (
    <Hoshi 
      borderColor={Colors.primary}
      onChangeText={input.onChange}
      onBlur={input.onBlur}
      onFocus={input.onFocus}
      value={input.value}
      // blurOnSubmit={false}
      
      {...props}
    />
  );
}

