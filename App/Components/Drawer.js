import React, { Component } from 'react';
import { View, Text, ScrollView,Button,SafeAreaView,TouchableOpacity
,StyleSheet,Image} from 'react-native';
import {DrawerItems } from 'react-navigation'
import otron from 'reactotron-react-native'
import Colors from '../Themes/Colors'
import FAIcon from 'react-native-vector-icons/FontAwesome';
import Images from '../Themes/Images'
import firebase from 'react-native-firebase'
const logout = (props)=>{
    // otron.log(props)
    return (
        <TouchableOpacity style={styles.item} onPress={()=>{firebase.auth().signOut();}}>
        <FAIcon style={styles.icon} name="sign-out" size={20} color={Colors.flatRed}/>
            <Text style={styles.text}>{'Logout'}</Text>
        </TouchableOpacity>
    )
}

export default class Drawer extends Component {
    render() {
        return (
            <ScrollView>
                <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always', horizontal: 'never' }}>
                <Image style={styles.image} source={Images.logo} resizeMode='contain'/>
                    <DrawerItems {...this.props} />
                    {logout(this.props)}
                </SafeAreaView>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    item:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginTop: -5,
    },
    icon:{
        marginLeft:16,
        marginRight:8
    },
    text:{
        marginTop:16,
        marginBottom:16,
        fontWeight: 'bold',
        color: Colors.flatRed,
    },
    image:{
        height:200,
        width:200,
        alignSelf: 'center',
    }
});