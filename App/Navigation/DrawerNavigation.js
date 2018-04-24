import React from 'react'
import { DrawerNavigator } from "react-navigation";
import {View,TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import EventFormScreen from '../Containers/EventFormScreen'
import EventScreen from '../Containers/EventScreen'


const navOptions = ({ navigation }) => ({
    headerLeft: <Icon name="bars" size={35} onPress={() => navigation.navigate('DrawerOpen')} />
})


const MenuNavigator = DrawerNavigator(
    // RouteConfigs
    {
        EventFormScreen: { screen: EventFormScreen, navigationOptions:navOptions },
        EventScreen: { screen: EventScreen, navigationOptions:navOptions },
    },
    //DrawerNavigatorconfigs
    {
        drawerPosition      : 'left',
        
    }
);

export default MenuNavigator;
