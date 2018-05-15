import React from 'react'
import { DrawerNavigator} from "react-navigation";
import {View,TouchableOpacity,ScrollView,Button} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Menu from '../Config/Menu'
import Drawer from '../Components/Drawer'
import Colors from '../Themes/Colors'
import firebase from 'react-native-firebase'
import otron from 'reactotron-react-native'

const navOptions = ({ navigation }) => ({
    headerLeft: <Icon name="bars" size={35} onPress={() => navigation.navigate('DrawerOpen')} />,
    headerVisibile: true
})




const MenuNavigator = DrawerNavigator(
    // RouteConfigs
    {
       ...Menu.admin
        
    },
    //DrawerNavigatorconfigs
    {
        contentComponent:Drawer,
        drawerPosition      : 'left',
        navigationOptions:{
            // header: null
        }
    }
);


export default MenuNavigator;
