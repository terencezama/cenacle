import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoginForm from '../Components/Forms/LoginForm'
import otron from 'reactotron-react-native'
import i18n from 'react-native-i18n'
// Styles
import FormScreen from '../Components/FormScreen';
import { View, TouchableOpacity,Text, StyleSheet, Keyboard } from 'react-native';
import { Colors } from '../Themes';
import firebase from 'react-native-firebase'
import Tips from 'react-native-root-tips'

class LoginScreen extends FormScreen {
  // static navigationOptions = { title: 'Welcome', header: { visible:false } };

  constructor(){
    super()
    this.iconName = "sign-in"
  }

  _onSubmit=(values)=>{
    Keyboard.dismiss()
    otron.log(values)
    // firebase.auth().sig
    const {email,password} = values;
    
    Tips.showLoading('loading...');
    firebase.auth()
    .signInAndRetrieveDataWithEmailAndPassword(email,password)
    .then(user=>{
      otron.log({user:user})
      Tips.hide();
    })
    .catch(reason=>{
      otron.log({reason:reason})
      Tips.showFail('em...failed');

    });
  }

  _registerAction = ()=>{
    this.props.navigation.navigate('RegisterScreen',null,null,'register')
    otron.log(this.props.navigation.state)
  }

  _forgetPasswordAction = ()=>{

  }

  renderActionView(){
    return (
    <View style={styles.actionView}>
      <TouchableOpacity style={styles.actionButton}>
        <Text style={styles.leftText}>{i18n.t('forgotPassword')}</Text>
      </TouchableOpacity> 
      <TouchableOpacity style={styles.actionButton} onPress={()=>this._registerAction()}> 
        <Text style={styles.rightText}>{i18n.t('register')}</Text>
      </TouchableOpacity>

    </View>)
  }

  renderForm(){
    return (<LoginForm  onSubmit={(values)=>this._onSubmit(values)}/>)
  }


}

const styles = StyleSheet.create({
  actionView:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftText:{
    color: Colors.normal,
    fontWeight: '100',
  },
  rightText:{
    color: Colors.primary,
    fontWeight: '100',
  },
  actionButton:{
    height:20
  }
});

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)