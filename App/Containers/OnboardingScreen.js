import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView, Image } from 'react-native'
import { connect } from 'react-redux'
import Images from '../Themes/Images'
import styles from './Styles/OnboardingScreenStyle'
import firebase from 'react-native-firebase'
import otron from 'reactotron-react-native'
import SInfo from 'react-native-sensitive-info'
import k from '../Services/Globals'
import { NavigationActions } from 'react-navigation';;
const timeoutInt = 3000;
class OnboardingScreen extends Component {
  static navigationOptions = { header: null };

  constructor(props){
    super(props)
    
    this.state={
      launched:false,
      action:''
    }
  }

  _reset= navigator =>{
    navAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: navigator }),
      ],
      key: 'root'
    });
    this.props.navigation.dispatch(navAction);
  }

  componentDidMount() {

    const {launched,action} = this.state

    if(!launched){
      setTimeout(()=>{
        this.setState({launched:true})
        this._reset(action)
      },timeoutInt)
    }
    
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      otron.log(user)
      let navigator = ''
      if (user == undefined || user == null) {
        SInfo.getItem(k.key_device_init, {}).then(value => {
          if (value == undefined) {
            navigator = 'RegisterScreen'
          } else {
            navigator = 'LoginScreen'
          }
        });
      } else {
        navigator = 'Menu'
      }
      (launched)?this._reset(navigator):this.setState({action:navigator})
    });
  }
  componentWillUnmount(){
    // this.unsubscribe()
  }
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={Images.holySpirit} resizeMode='contain' />
        <View style={[styles.image, styles.textContainer]}>
          <Text style={[styles.text, { fontWeight: 'bold' }]}> {'Cenacle Du St Esprit'} </Text>
          <Text style={[styles.text, { fontSize: 20 }]}> {`Mais le consolateur, l'Esprit-Saint, que le Père enverra en mon nom, vous enseignera toutes choses, et vous rappellera tout ce que je vous ai dit.`} </Text>
          <Text style={[styles.text, { fontWeight: 'bold', fontSize: 20 }]}> {`Jean 14:26`} </Text>
        </View>
        <Text style={[styles.text, { fontWeight: 'bold', fontSize: 20, marginBottom: 8 }]}> {`Loading ...`} </Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingScreen)
