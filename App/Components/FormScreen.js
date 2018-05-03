import React, { Component } from 'react'
import {
  ScrollView, Text, KeyboardAvoidingView, View, Image, StatusBar, BackHandler,
  Alert
} from 'react-native'
import { Images, Colors } from '../Themes/'
import Icon from 'react-native-vector-icons/FontAwesome'
// import LoginForm from '../Components/Forms/LoginForm'
import otron from 'reactotron-react-native'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import LoadingView from '../Components/LoadingView'

// Styles
import styles from './Styles/FormScreenStyle'


class FormScreen extends Component {
  static navigationOptions = {  header: null };
  constructor() {
    super()
    this.iconName = "check"
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
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
    const { error } = this.state
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
        <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
          <StatusBar
            backgroundColor={Colors.primary}
            barStyle="light-content"
          />
          <KeyboardAvoidingView behavior='position'>
            <View style={styles.container}>
              <View style={styles.section1}>
                <Image style={styles.headerImage} source={Images.headerLogo} resizeMode={Image.resizeMode.stretch}>

                </Image>
              </View>
              <View style={styles.section2}>
                <View style={styles.formView}>
                  {this.renderForm()}
                </View>
                <View style={styles.actionView}>
                  {this.renderActionView()}
                </View>
              </View>
              <View style={styles.iconContainer}>
                <Icon name={this.iconName} size={50} color='white' />
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
        <LoadingView loading={this.state.loading}/>
        </View>

    )
  }
}


export default FormScreen
