import Colors from '../../Themes/Colors'
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import otron from 'reactotron-react-native'
import moment from 'moment-with-locales-es6'
import { Button } from 'react-native-elements';
import RNGooglePlacePicker from 'react-native-google-place-picker';

export default class ReduxLocationPickerBase extends Component {
    constructor(props) {
        super(props)

    }

    _onLocationPress = () => {
        RNGooglePlacePicker.show((response) => {
            if (response.didCancel) {
                // otron.log('User cancelled GooglePlacePicker');
            }
            else if (response.error) {
                // otron.log('GooglePlacePicker Error: ', response.error);
            }
            else {
                //   this.setState({
                //     location: response
                //   });
                const { input, meta, } = this.props;
                input.onChange(response)
            }
        })
    }

    render() {
        const { input, meta, } = this.props;
        return (
            <View style={{marginTop: 8,marginBottom: 8,}}>
                <Button
                    key={5}
                    onPress={this._onLocationPress}
                    style={{marginTop: 8 }}
                    backgroundColor={Colors.primary}
                    raised
                    icon={{ name: 'map-marker', type: 'font-awesome' }}
                    containerViewStyle={{marginRight:0,marginLeft:0}}
                    title={input.value==''||input.value==undefined?'Location':input.value.name}
                />
            </View>
        );
    }


}



