import React, { Component } from 'react'
import {
  ScrollView, Text, KeyboardAvoidingView, View, Image, StatusBar, BackHandler,
  Alert, Keyboard
} from 'react-native'
import InputScrollView from 'react-native-input-scroll-view';
import { Images, Colors } from '../Themes/'
import Icon from 'react-native-vector-icons/FontAwesome'
// import LoginForm from '../Components/Forms/LoginForm'
import otron from 'reactotron-react-native'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import LoadingView from '../Components/LoadingView'
import CView from '../Components/View'
// Styles
import styles from './Styles/FormScreenStyle'
import {
  Hoshi,
} from 'react-native-textinput-effects';


class FormScreen extends Component {
  // static navigationOptions = {  header: null };
  static navigationOptions = ({ navigation,screenProps }) => {
    const options = {header: null}
    otron.log(screenProps)
    return options
  }
  constructor() {
    super()
    this.iconName = "check"
    this.state = {
      loading: true,
      hide:false,
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
    // this.setState({inputRefs:this.refs.formview.refs})
    // otron.log(this.refs)
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow =()=> {
    // alert('Keyboard Shown');
    this.setState({hide:true})
  }

  _keyboardDidHide =()=> {
    // alert('Keyboard Hidden');
    this.setState({hide:false})
  }




  onBackButtonPressAndroid = () => {
    this.props.navigation.goBack()
    return true;
  };


  //region sub render components
  renderForm() {

  }

  renderActionView() {

  }

  //endregion


  render() {
    const { error,hide } = this.state
    if (error != undefined) {
      Alert.alert(
        'Error',
        error,
        [
          { text: 'OK', onPress: () => { this.setState({ error: undefined }) } },
        ],
        { cancelable: false }
      )

    }

    return (
      <View>
        <InputScrollView keyboardShouldPersistTaps="always"  >
          <StatusBar
            backgroundColor={Colors.primary}
            barStyle="light-content"
          />
          <View style={styles.container}>
              <CView style={styles.section1} hide={hide}>
                <Image style={styles.headerImage} source={Images.headerLogo} resizeMode={Image.resizeMode.stretch}>

                </Image>
              </CView>
              <View style={styles.section2}>
                <View ref='formview' style={styles.formView}>
                  {this.renderForm()}
                </View>
                <View style={styles.actionView}>
                  {this.renderActionView()}
                </View>
              </View>
              <CView style={styles.iconContainer} hide={hide}>
                <Icon name={this.iconName} size={50} color='white' />
              </CView>
            </View>
        </InputScrollView>
        <LoadingView loading={this.state.loading}/>
        </View>

    )
  }
}


export default FormScreen
