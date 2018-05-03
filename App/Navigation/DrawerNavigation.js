import React from 'react'
import { DrawerNavigator } from "react-navigation";
import {View,TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import EventFormScreen from '../Containers/EventFormScreen'
import EventScreen from '../Containers/EventScreen'
import EventsManagerScreen from '../Containers/EventsManagerScreen'

const navOptions = ({ navigation }) => ({
    headerLeft: <Icon name="bars" size={35} onPress={() => navigation.navigate('DrawerOpen')} />,
    headerVisibile: true
})


const MenuNavigator = DrawerNavigator(
    // RouteConfigs
    {
        EventScreen: { screen: EventScreen, navigationOptions:navOptions },
        EventFormScreen: { screen: EventFormScreen, navigationOptions:navOptions },
        EventsManagerScreen: { screen: EventsManagerScreen, navigationOptions:navOptions },
        
    },
    //DrawerNavigatorconfigs
    {
        drawerPosition      : 'left',
        
    }
);

export default MenuNavigator;
