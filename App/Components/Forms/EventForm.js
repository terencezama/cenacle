import React from 'react'
import I18n from 'react-native-i18n'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import ReduxInput from '../ReduxInput'
import ReduxDatePicker from '../ReduxDatePicker'
import ReduxTimePicker from '../ReduxTimePicker'
import ReduxtLocationPicker from '../ReduxLocationPicker'
import { Button } from 'react-native-elements';
import Colors from '../../Themes/Colors'
import moment from 'moment-with-locales-es6'


const EventForm = ({
  invalid, handleSubmit, onSubmit, processing,update
}) => [
    <ReduxInput
      key={1}
      label={I18n.t('eventTitleInputField')}
      name='title'
    />,
    <ReduxInput
      key={2}
      label={I18n.t('eventDescInputField')}
      name='desc'
      multiline={true}
      numberOfLines={10}
      height={200}

    />,
    <ReduxDatePicker
      key={3}
      name='date'
    />,
    <ReduxTimePicker
      key={4}
      name='time'
    />,
    <ReduxtLocationPicker
      key={5}
      name='location'
    />,
    <Button
      raised
      key={6}
      onPress={handleSubmit(onSubmit)}
      style={{ marginTop: 8 }}
      containerViewStyle={{marginRight:0,marginLeft:0}}
      backgroundColor={Colors.accent}
      title={update?"Update":"Create"}
    />

  ]

// const currentDate = () => {
//   const m = moment()
//   m.locale('fr')
//   let str = m.format('DD MMM YYYY').replace('.', '').toUpperCase()

//   return str
// }
// EventForm = connect(
//   state => ({
//     initialValues: {
//       time: '02:00 PM'
//     }
//   })
// )(EventForm);
export default reduxForm({
  form: 'EventForm',
})(EventForm)



