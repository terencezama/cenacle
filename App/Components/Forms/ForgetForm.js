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
import { View } from 'react-native-animatable';
import { ApplicationStyles } from '../../Themes'
import {Validate,Normalize} from '../../Lib'

const ForgetForm = ({
    invalid, handleSubmit, onSubmit, processing, update
}) => {

    return (
        <View style={ApplicationStyles.form}>
            <View style={ApplicationStyles.formCenterItems}>
                <ReduxInput
                    key={1}
                    label={I18n.t('fieldEmail')}
                    name='email'
                    validate={[Validate.isEmail,Validate.isRequired]}
                    keyboardType='email-address'
                />
            </View>
            <Button
                // raised
                large
                key={6}
                onPress={handleSubmit(onSubmit)}
                textStyle={ApplicationStyles.submitButton}
                // style={{ marginTop: 8 }}
                // containerViewStyle={{ marginRight: 0, marginLeft: 0 }}
                backgroundColor={Colors.primary}
                title={I18n.t('fieldForgetPassword')}
                disabled={invalid}
            />
        </View>

    )
}

export default reduxForm({
    form: 'ForgetForm',
})(ForgetForm)



