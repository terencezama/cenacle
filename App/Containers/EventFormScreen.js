import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { connect,dispatch } from 'react-redux'
import {reset} from 'redux-form'
import EventForm from '../Components/Forms/EventForm'
import Reactoctron from 'reactotron-react-native'
import i18n from 'react-native-i18n'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/EventFormScreenStyle'
import { View } from 'react-native-animatable';

class EventFormScreen extends Component {
  static navigationOptions = {
    title: i18n.t('screenEventFormTitle'),
  };

  componentWillMount(){
    this.props.reset()
  }

  _onSubmit = (values)=>{
    
    Reactoctron.log(values)
  }

  render () {
    
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='padding'>
        <EventForm onSubmit={values=>this._onSubmit({values})}/>
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
