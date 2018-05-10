import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { connect,dispatch } from 'react-redux'
import {reset} from 'redux-form'
import EventForm from '../Components/Forms/EventForm'
import Reactoctron from 'reactotron-react-native'
import i18n from 'react-native-i18n'
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'react-native-firebase'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/EventFormScreenStyle'
import { View } from 'react-native-animatable';

class EventFormScreen extends Component {
  // static navigationOptions = {
  //   title: i18n.t('screenEventFormTitle'),
  // };
  static navigationOptions = ({ navigation }) => {
    const options = {}
    if(navigation == null || navigation == undefined){
      options.title = i18n.t('screenEventFormTitle')
      return options
   }
    const {params} = navigation.state
    if(params != undefined && 'title' in params){
      options.title = params.title
    }else{
      options.title = i18n.t('screenEventFormTitle')
    }
    return options
  }
  

  constructor(){
    super();
    this.ref = firebase.firestore().collection('events')
    this.state = {
      initialValues: {
        date: new Date,
        time: '01:00 PM'
      },
      update:false
    }



  }

  componentWillMount(){
    this.props.reset()
    const {params} = this.props.navigation.state
    if(params != undefined && 'update' in params){
      Reactoctron.log(params)
      // this.props.navigationOptions.t
      this.props.navigation.setParams({title:'Update Event'})
      this.setState({
        initialValues: params.update.item,
        update: true
      })
    }
  }

  _onSubmit = (values)=>{
    const {update, initialValues} = this.state;
    
    if(!update){
      this.ref.add(values)
    }else{
      this.ref.doc(initialValues.key).update(values)
    }
    
  }

  render () {
    
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='padding'>
        <EventForm onSubmit={values=>this._onSubmit({values})}  initialValues={this.state.initialValues} update={this.state.update}
/>
        </KeyboardAvoidingView>
      </ScrollView>
      // <View> 
      //   <EventForm onSubmit={values=>this._onSubmit({values})}/>
      // </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    reset:()=>dispatch(reset('EventForm'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventFormScreen)
