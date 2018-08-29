import React from 'react'
import EventFormScreen from '../Containers/EventFormScreen'
import EventScreen from '../Containers/EventScreen'
import EventMemberScreen from '../Containers/EventMemberScreen'
import EventMemberFormScreen from '../Containers/EventMemberFormScreen'

import EventsManagerScreen from '../Containers/EventsManagerScreen'
import EventsMemberManagerScreen from '../Containers/EventsMemberManagerScreen'
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
const base = {
    BiblePageScreen: { screen: BiblePageScreen, navigationOptions:navOptions },
}

const user = {
    ShareScreen: { screen: ShareScreen, navigationOptions:navOptions },
    EventScreen: { screen: EventScreen, navigationOptions:navOptions },
}

const member = {
    EventMemberScreen: { screen: EventMemberScreen, navigationOptions:navOptions },
}

const admin = {
    ShareEditorScreen: { screen: ShareEditorScreen, navigationOptions:navOptions },
    EventFormScreen: { screen: EventFormScreen, navigationOptions:navOptions },
    EventMemberFormScreen: {screen:EventMemberFormScreen, navigationOptions:navOptions},
    EventsManagerScreen: { screen: EventsManagerScreen, navigationOptions:navOptions },
    EventsMemberManagerScreen: { screen: EventsMemberManagerScreen, navigationOptions:navOptions },
    SharesManagerScreen: { screen: SharesManagerScreen, navigationOptions:navOptions },
}

export default {
    base:{
        ...base
    },
    user:{
        ...base,
        ...user,
    },
    member:{
        ...base,
        ...user,
        ...member,
    },
    admin:{
        ...base,  
        ...user,
        ...member,
        ...admin
    }
}