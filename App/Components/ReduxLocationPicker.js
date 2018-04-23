import PropTypes from 'prop-types'
import React from 'react'
import { Field } from 'redux-form'

import ReduxLocationPickerBase from './Base/ReduxLocationPickerBase'


const ReduxLocationPicker = ({ name, label, ...props }) => (
  <Field
    {...props}
    label={label}
    name={name}
    component={ReduxLocationPickerBase}
  />
)

ReduxLocationPicker.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string
}
ReduxLocationPicker.defaultProps = {
  label: 'Location',
  name: 'map'
}

export default ReduxLocationPicker
