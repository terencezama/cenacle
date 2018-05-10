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
import { Validate, Normalize } from '../../Lib'

const RegisterForm = ({
    invalid, handleSubmit, onSubmit, processing, update
}) => {

    return (
        <View style={ApplicationStyles.form}>
            <View style={ApplicationStyles.formCenterItems}>
                <ReduxInput
                    key={1}
                    label={I18n.t('fieldNickname')}
                    name='nickname'
                    validate={[ Validate.isRequired]}
                    // keyboardType='email-address'
                />
                <ReduxInput
                    key={2}
                    label={I18n.t('fieldEmail')}
                    name='email'
                    validate={[Validate.isEmail, Validate.isRequired]}
                    keyboardType='email-address'
                />
                <ReduxInput
                    key={3}
                    label={I18n.t('fieldPassword')}
                    name='password'
                    secureTextEntry
                    validate={[Validate.isMinLength6, Validate.isRequired]}
                />
                <ReduxInput
                    key={4}
                    label={I18n.t('fieldMobile')}
                    name='mobile'
                    // normalize={Normalize.mobile}
                />
            </View>
            <Button
                // raised
                large
                key={5}
                onPress={handleSubmit(onSubmit)}
                textStyle={ApplicationStyles.submitButton}
                // style={{ marginTop: 8 }}
                // containerViewStyle={{ marginRight: 0, marginLeft: 0 }}
                backgroundColor={Colors.primary}
                title={I18n.t('fieldSignup')}
                disabled={invalid}
            />
        </View>

    )
}

export default reduxForm({
    form: 'RegisterForm',
})(RegisterForm)



