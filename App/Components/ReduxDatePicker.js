import PropTypes from 'prop-types'
import React from 'react'
import { Field } from 'redux-form'

import ReduxDatePickerBase from './Base/ReduxDatePickerBase'

// const date = (value, previousValue) => {
//   if (!value) return ''
//   const numbers = value.replace(/[^\d]/g, '')

//   // Check if typing forward
//   if (!previousValue || value.length > previousValue.length) {
//     if (numbers.length === 5 && numbers.slice(4, 5) > 1) return `${numbers.slice(0, 4)}`
//     if (numbers.length === 6 && (numbers.slice(4, 6) > 12 || numbers.slice(4, 6) < 1)) return `${numbers.slice(0, 4)}-${numbers.slice(4, 5)}`
//     if (numbers.length === 7 && numbers.slice(6, 7) > 3) return `${numbers.slice(0, 4)}-${numbers.slice(4, 6)}`
//     if (numbers.length === 8 && numbers.slice(6, 8) > 31) return `${numbers.slice(0, 4)}-${numbers.slice(4, 6)}-${numbers.slice(6, 7)}`
//   } else if (value.length < previousValue.length) {
//     return ''
//   }

//   if (numbers.length < 5) return numbers
//   if (numbers.length < 7) return `${numbers.slice(0, 4)}-${numbers.slice(4)}`

//   return `${numbers.slice(0, 4)}-${numbers.slice(4, 6)}-${numbers.slice(6)}`
// }

const ReduxDatePicker = ({ name, label, ...props }) => (
  <Field
    {...props}
    label={label}
    name={name}
    component={ReduxDatePickerBase}

    keyboardType='numeric'
    maxLength={10}
    // normalize={date}
  />
)

ReduxDatePicker.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string
}
ReduxDatePicker.defaultProps = {
  label: 'Date',
  name: 'date'
}

export default ReduxDatePicker
