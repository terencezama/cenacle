import PropTypes from 'prop-types'
import React from 'react'
import { Field } from 'redux-form'
import ReduxTimePickerBase from './Base/ReduxTimePickerBase'


const ReduxTimePicker = ({ name, label, ...props }) => (
  <Field
    {...props}
    label={label}
    name={name}
    component={ReduxTimePickerBase}

    keyboardType='numeric'
    maxLength={10}
    // normalize={date}
  />
)

ReduxTimePicker.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string
}
ReduxTimePicker.defaultProps = {
  label: 'Time',
  name: 'time'
}

export default ReduxTimePicker
