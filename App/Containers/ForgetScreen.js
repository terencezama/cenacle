import React, { Component } from 'react'
import { connect } from 'react-redux'
import ForgetForm from '../Components/Forms/ForgetForm'
import otron from 'reactotron-react-native'
import i18n from 'react-native-i18n'
// Styles
import FormScreen from '../Components/FormScreen';
import { View, TouchableOpacity,Text, StyleSheet,Keyboard,Alert } from 'react-native';
import { Colors } from '../Themes';
import firebase from 'react-native-firebase'
import {show} from '../Redux/NavigationRedux'


class ForgetScreen extends FormScreen {
  // static navigationOptions = { title: 'Welcome', header: { visible:false } };

  constructor(){
    super()
    this.iconName = "unlock"
  }

  componentWillMount(){
    this.setState({
      loading:false
    })
  }

  _onSubmit=(values)=>{
    Keyboard.dismiss()
    const {email}     = values
    this.setState({loading:true})
    
    firebase.auth().sendPasswordResetEmail(email)
    .then(()=>{
      this.setState({loading:false})
      Alert.alert(
        'Success',
        i18n.t('success-forgetpassword'),
        [
          { text: 'OK', onPress: () => {  this._loginAction() } },
        ],
        { cancelable: false }
      )
    })
    .catch(reason=>{
      otron.log({reason:reason})
      this.setState({loading:false})
      this.setState({error:i18n.t(reason.code)})
    })
    
  }

  _loginAction = ()=>{
    this.props.show('login')
  }

  _registerAction = ()=>{
    this.props.show('register')
  }

  renderActionView(){
    return (
    <View style={styles.actionView}>
      <TouchableOpacity style={styles.actionButton} onPress={()=>{this._registerAction()}}>
        <Text style={styles.leftText}>{i18n.t('register')}</Text>
      </TouchableOpacity> 
      <TouchableOpacity style={styles.actionButton} onPress={()=>{this._loginAction()}}> 
        <Text style={styles.rightText}>{i18n.t('login')}</Text>
      </TouchableOpacity>

    </View>)
  }

  renderForm(){
    return (<ForgetForm  onSubmit={(values)=>this._onSubmit(values)}/>)
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
    show: payload => dispatch(show(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgetScreen)
