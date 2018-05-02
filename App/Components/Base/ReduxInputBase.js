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
  const { input,meta, meta:{valid,error},label } = props;
  // otron.log(meta)
  // otron.log(input)
  // if(input.value == '' && ){
  //   input.value = meta.initial
  // }t


  return (
    <Hoshi 
      borderColor={valid?Colors.primary:Colors.error}
      onChangeText={input.onChange}
      onBlur={input.onBlur}
      onFocus={input.onFocus}
      value={input.value}
      
      {...props}
      label={error == undefined?label: `${label} (${error})`}
      // labelStyle={{color:error != undefined?Colors.error:Colors.text}}
      // blurOnSubmit={false}
      
      
    />
  );
}

