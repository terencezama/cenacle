import React, { Component } from 'react'
import { connect } from 'react-redux'
import RegisterForm from '../Components/Forms/RegisterForm'
import otron from 'reactotron-react-native'
import i18n from 'react-native-i18n'
// Styles
import FormScreen from '../Components/FormScreen';
import { View, TouchableOpacity, Text, StyleSheet, Keyboard } from 'react-native';
import { Colors } from '../Themes';
import firebase from 'react-native-firebase'
import { change,reset } from 'redux-form'
import {reset as navreset} from '../Redux/NavigationRedux'
class RegisterScreen extends FormScreen {
  // static navigationOptions = { gesturesEnabled: false };

  constructor() {
    super()
    this.iconName = "user-plus"
  }

  componentWillMount() {
    this.setState({
      loading: false
    })
    const { email } = this.props.auth
    if (email) {
      this.props.change('email', email)
    }
  }

  _resetFields(){
    this.props.reset()
    const {email} = this.props.auth
    if(email){
      this.props.change('email',email)
    }
  }

  _saveEmailField() {
    const values = this.props.form.RegisterForm.values
    if (values && values.email) this.props.saveEmail(values.email)
  }

  _onSubmit = (values) => {
    this._saveEmailField()
    Keyboard.dismiss()
    // otron.log(values)
    const { email, password, mobile, nickname } = values

    this.setState({ loading: true })
    firebase.auth()
      .createUserAndRetrieveDataWithEmailAndPassword(email, password)
      .then(user => {
        this.setState({ loading: false })
        // otron.log(user)
        let collection = firebase.firestore().collection('cenacle').doc('user').collection('details')
        const data = {
          uid: user.user.uid,
          email,
          mobile,
          nickname,
          role: 'user'
        }

        collection.doc(user.user.uid).set(data)

        this._resetFields()
        this.props.navreset('menu')
          

      }).catch(reason => {
        // otron.log({ reason: reason })
        this.setState({ loading: false })
        this.setState({ error: i18n.t(reason.code) })
      });
  }

  _loginAction = () => {
    this._saveEmailField()
    Keyboard.dismiss()
    this.props.show('login')
  }

  _forgetPasswordAction = () => {
    this._saveEmailField()
    Keyboard.dismiss()
    this.props.show('forget')
  }

  renderActionView() {
    return (
      <View style={styles.actionView}>
        <TouchableOpacity style={styles.actionButton} onPress={() => { this._forgetPasswordAction() }}>
          <Text style={styles.leftText}>{i18n.t('forgotPassword')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => { this._loginAction() }}>
          <Text style={styles.rightText}>{i18n.t('login')}</Text>
        </TouchableOpacity>

      </View>)
  }

  renderForm() {
    return (<RegisterForm onSubmit={(values) => this._onSubmit(values)} />)
  }


}

const styles = StyleSheet.create({
  actionView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftText: {
    color: Colors.normal,
    fontWeight: '100',
  },
  rightText: {
    color: Colors.primary,
    fontWeight: '100',
  },
  actionButton: {
    height: 20
  }
});

// const mapStateToProps = (state) => {
//   return {
//   }
// }

const mapDispatchToProps = (dispatch) => {
  return {
    ...FormScreen.mapDispatchToProps(dispatch),
    change: (key, value) => dispatch(change('RegisterForm', key, value)),
    reset:()=>dispatch(reset('RegisterForm')),
    navreset:payload=>dispatch(navreset(payload))
  }
}

export default connect(FormScreen.mapStateToProps, mapDispatchToProps)(RegisterScreen)
// export default RegisterScreen
