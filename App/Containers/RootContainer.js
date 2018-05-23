import React, { Component } from 'react'
import { View, StatusBar, BackHandler } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import {NavigationActions} from 'react-navigation'
import firebase from 'react-native-firebase'
import otron from 'reactotron-react-native'
import SInfo from 'react-native-sensitive-info'
import k from '../Services/Globals'
// Styles
import styles from './Styles/RootContainerStyles'
import {show,reset} from '../Redux/NavigationRedux'
import { Colors } from '../Themes';
const timeoutInt = 1000;
class RootContainer extends Component {

  constructor(props){
    super(props)
    this.state = {
      launched: false,
      action: ''
    }
  }

  _setNavigator=(navigator)=>{
    if(this.state.launched) {
      this._reset(navigator)
    }else{
      this.setState({ action: navigator })
    }
  }

  _reset = (navigator) => {
    // if(navigator == "menu"){
    //   this.props.reset(navigator)
    // }else{
    //   this.props.show(navigator)
    // }
    this.props.reset(navigator)
    
  }

  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }

    const { launched } = this.state

    if (!launched) {
      setTimeout(() => {
        this.setState({ launched: true })
        this._reset(this.state.action,this.state.key)
      }, timeoutInt)
    }

    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      // otron.log(user)
      let navigator = ''
      if (user == undefined || user == null) {
        SInfo.getItem(k.key_device_init, {}).then(value => {
          if (value == undefined) {
            navigator = 'register'
          } else {
            navigator = 'login'
          }
          this._setNavigator(navigator)
        });
      } else {
        navigator = 'menu'
        this._setNavigator(navigator)
      }  
      this.unsubscribe()
    });
  }

  componentWillMount(){
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }
  onBackButtonPressAndroid = () => {
    // this.props.navigation.goBack()
    //this.props.back()
    // otron.log(this.props.nav)
    const {nav} = this.props
    const routeName = nav.routes[nav.index].routeName
    if(routeName == 'menu'){

    }else{
      this.props.back()
    }
    return true;
  };
  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }

  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' backgroundColor={Colors.primary} />
        <ReduxNavigation />
      </View>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
  back:()=> dispatch(NavigationActions.back()),
  show: payload => dispatch(show(payload)),
  reset: payload => dispatch(reset(payload))
})
const mapStateToProps = state => ({ nav: state.nav })
export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
