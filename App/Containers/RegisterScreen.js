import React, { Component } from 'react'
import { connect } from 'react-redux'
import RegisterForm from '../Components/Forms/RegisterForm'
import otron from 'reactotron-react-native'
import i18n from 'react-native-i18n'
// Styles
import FormScreen from '../Components/FormScreen';
import { View, TouchableOpacity,Text, StyleSheet } from 'react-native';
import { Colors } from '../Themes';
import firebase from 'react-native-firebase'



class RegisterScreen extends FormScreen {
  // static navigationOptions = { title: 'Welcome', header: { visible:false } };

  constructor(){
    super()
    this.iconName = "user-plus"
  }

  componentWillMount(){
    this.setState({
      loading:false
    })
  }

  _onSubmit=(values)=>{
    otron.log(values)
    const {email, password, mobile}     = values

    this.setState({loading:true})
    firebase.auth()
    .createUserAndRetrieveDataWithEmailAndPassword(email,password)
    .then(user=>{
      this.setState({loading:false})
      
    }).catch(reason=>{
      otron.log({reason:reason})
      this.setState({loading:false})
    });
  }

  _loginAction = ()=>{
    otron.log(this.props.navigation.state)
    this.props.navigation.navigate('LoginScreen',null,null,'login')
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
      <TouchableOpacity style={styles.actionButton} onPress={()=>{this._loginAction()}}> 
        <Text style={styles.rightText}>{i18n.t('login')}</Text>
      </TouchableOpacity>

    </View>)
  }

  renderForm(){
    return (<RegisterForm  onSubmit={(values)=>this._onSubmit(values)}/>)
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
