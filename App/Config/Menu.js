import React from 'react'
import EventFormScreen from '../Containers/EventFormScreen'
import EventScreen from '../Containers/EventScreen'
import EventsManagerScreen from '../Containers/EventsManagerScreen'
import Icon from 'react-native-vector-icons/FontAwesome'
const navOptions = ({ navigation }) => ({
    headerLeft: <Icon name="bars" size={35} onPress={() => navigation.navigate('DrawerOpen')} />,
    headerVisibile: true
})
const user = {
    EventScreen: { screen: EventScreen, navigationOptions:navOptions },
}

const member = {
    EventFormScreen: { screen: EventFormScreen, navigationOptions:navOptions },
    EventsManagerScreen: { screen: EventsManagerScreen, navigationOptions:navOptions },
}

const admin = {

}

export default {
    user:{
        ...user
    },
    member:{
        ...user,
        ...member,
    },
    admin:{
        ...user,
        ...member,
        ...admin
    }
}