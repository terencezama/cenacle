import React from 'react'
import EventFormScreen from '../Containers/EventFormScreen'
import EventScreen from '../Containers/EventScreen'
import EventsManagerScreen from '../Containers/EventsManagerScreen'
import ShareScreen from '../Containers/ShareScreen'
import ShareEditorScreen from '../Containers/ShareEditorScreen'
import SharesManagerScreen from '../Containers/SharesManagerScreen'
import Icon from 'react-native-vector-icons/FontAwesome'
// import AdminUserScreen,BiblePageScreen, from '../Containers'
import {BiblePageScreen} from '../Containers'

const navOptions = ({ navigation }) => ({
    headerLeft: <Icon style={{marginLeft:8}} name="bars" size={35} onPress={() => navigation.navigate('DrawerOpen')} />,
    headerVisibile: true
})
const user = {
    BiblePageScreen: { screen: BiblePageScreen, navigationOptions:navOptions },
    EventScreen: { screen: EventScreen, navigationOptions:navOptions },
    ShareScreen: { screen: ShareScreen, navigationOptions:navOptions },
    
}

const member = {
    ShareEditorScreen: { screen: ShareEditorScreen, navigationOptions:navOptions },
    EventFormScreen: { screen: EventFormScreen, navigationOptions:navOptions },
    EventsManagerScreen: { screen: EventsManagerScreen, navigationOptions:navOptions },
    SharesManagerScreen: { screen: SharesManagerScreen, navigationOptions:navOptions },
    
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