import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoginForm from '../Components/Forms/LoginForm'
import i18n from 'react-native-i18n'
// Styles
import FormScreen from '../Components/FormScreen';
import { View, TouchableOpacity,Text, StyleSheet, Keyboard } from 'react-native';
import { Colors } from '../Themes';
import firebase from 'react-native-firebase'
import SInfo from 'react-native-sensitive-info'
import k from '../Services/Globals'
import {change,reset} from 'redux-form'
import {reset as navreset} from '../Redux/NavigationRedux'


class LoginScreen extends FormScreen {
  // static navigationOptions = { title: 'Welcome', header: { visible:false } };

  constructor(props){
    super(props)
    this.iconName = "sign-in"
  }

  componentWillMount(){
    this.setState({
      loading:false
    })
    const {email} = this.props.auth
    if(email){
      this.props.change('email',email)
    }
   
  }


  

  componentDidMount(){
    super.componentDidMount();
    
  }

  _resetFields(){
    this.props.reset()
    const {email} = this.props.auth
    if(email){
      this.props.change('email',email)
    }
  }
  _saveEmailField(){
    const values = this.props.form.LoginForm.values
    if(values && values.email)this.props.saveEmail(values.email)
  }

  _onSubmit=(values)=>{
    this._saveEmailField()
    Keyboard.dismiss()
    // otron.log(values)
    // firebase.auth().sig
    const {email,password} = values;
    
    this.setState({loading:true})
    firebase.auth()
    .signInAndRetrieveDataWithEmailAndPassword(email,password)
    .then(user=>{
      // otron.log({user:user})
      this.setState({loading:false})
      SInfo.setItem(k.key_device_init,'true',{})
      this._resetFields()
      this.props.navreset('menu')
    })
    .catch(reason=>{
      // otron.log({reason:reason})
      this.setState({loading:false})
      this.setState({error:i18n.t(reason.code)})
    });

    
  }

  _registerAction = ()=>{
    this._saveEmailField()
    Keyboard.dismiss()
    this.props.show('register')
  }

  _forgetPasswordAction = ()=>{
    this._saveEmailField()
    Keyboard.dismiss()
    this.props.show('forget')
  }

  renderActionView(){
    return (
    <View style={styles.actionView}>
      <TouchableOpacity style={styles.actionButton}  onPress={()=>{this._forgetPasswordAction()}}>
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

// const mapStateToProps = (state) => {
//   return {
//   }
// }

const mapDispatchToProps = (dispatch) => {
  return {
    ...FormScreen.mapDispatchToProps(dispatch),
    change:(key,value)=>dispatch(change('LoginForm',key,value)),
    reset:()=>dispatch(reset('LoginForm')),
    navreset:payload=>dispatch(navreset(payload))
  }
}

export default connect(FormScreen.mapStateToProps, mapDispatchToProps)(LoginScreen)
// export default LoginScreen