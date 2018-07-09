import React, { Component } from 'react';
import {
    View, Text, ScrollView, Button, SafeAreaView, TouchableOpacity
    , StyleSheet, Image, FlatList, AsyncStorage
} from 'react-native';
import { DrawerItems } from 'react-navigation'
import Colors from '../Themes/Colors'
import FAIcon from 'react-native-vector-icons/FontAwesome';
import Images from '../Themes/Images'
import firebase from 'react-native-firebase'
import Menu from '../Config/Menu'
import DrawerItem from '../Components/DrawerItem'
import { reset } from '../Redux/NavigationRedux'
import { connect } from 'react-redux'
import i18n from 'react-native-i18n'
import Metrics from '../Themes/Metrics'
class Drawer extends Component {

    mounted = true;
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    setMenu = (role) => {
        menu = Menu[role]
        const _data = Object.keys(menu).map(key => {
            let title = 'Fake'
            if (typeof menu[key].screen.navigationOptions == 'function') {
                title = menu[key].screen.navigationOptions(this.props.navigation).title

            } else {
                title = menu[key].screen.navigationOptions.title
            }

            return { key: key, title: title, active: false }
        })

        // this.setState({data:_data})
        this._setActive(_data)

    }

    setMenuAsync = async () => {

        const { uid } = firebase.auth().currentUser
        let role = await AsyncStorage.getItem(uid)
        if(role)this.setMenu(role);
        /*
        let role = await AsyncStorage.getItem(uid)
        if(role){
            
            this.setMenu(role)
        }else{
            const details = firebase.firestore().collection('cenacle').doc('user').collection('details')
            let doc = await details.doc(uid).get()
            role = doc.data().role
            
            await AsyncStorage.setItem(uid,role)
            this.setMenu(role)
        }
        */
        const details = firebase.firestore().collection('cenacle').doc('user').collection('details')
        let doc = await details.doc(uid).get()
        role = doc.data().role

        await AsyncStorage.setItem(uid, role)
        this.setMenu(role)
    }

    componentWillMount() {
        this.setMenu('user')
        this.setMenuAsync()

    }


    componentWillUnmount() {
        this.mounted = false;
    }

    _setActive = adata => {
        const index = this.props.navigation.state.index
        const _data = adata || this.state.data
        if (!_data) return;
        const data = _data.slice(0)


        for (let i in data) {
            data[i].active = false
        }
        data[index].active = true

        if (this.mounted) {
            this.setState({ data: data.slice(0) })
        }



    }

    componentWillReceiveProps() {



        this._setActive()
    }

    _logout = () => {
        firebase.auth().signOut();
        this.props.reset('login')
    }

    _renderItem = item => {
        return (<Text>{item.key}</Text>)
    }
    _renderLogout = () => {
        return (
            <TouchableOpacity style={styles.item} onPress={() => { this._logout() }}>
                <FAIcon style={styles.icon} name="sign-out" size={20} color={Colors.flatRed} />
                <Text style={styles.text}>{i18n.t('logOut')}</Text>
            </TouchableOpacity>
        )
    }
    render() {
        // const {data} = this.state
        return (
            <ScrollView>
                <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always', horizontal: 'never' }}>
                    <Image style={styles.image} source={Images.menu} resizeMode='cover' />
                    {/* <DrawerItems {...this.props} /> */}
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item, index }) => {
                            return (<DrawerItem item={item} index={index} onPress={() => {
                                this.props.navigation.navigate(item.key)
                                this.setState({ index: this.props.navigation.index })
                            }} />)
                        }}
                        keyExtractor={(item, index) => index}
                    />
                    {this._renderLogout()}
                </SafeAreaView>
            </ScrollView>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        reset: payload => dispatch(reset(payload))
    }
}

export default connect(null, mapDispatchToProps)(Drawer)
const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginTop: -5,
    },
    icon: {
        marginLeft: 16,
        marginRight: 8
    },
    text: {
        marginTop: 16,
        marginBottom: 16,
        fontWeight: 'bold',
        color: Colors.flatRed,
    },
    image: {
        // flex:0.3,
        // height: 300,
        width: Metrics.screenWidth*(934/1080),
        alignSelf: 'center',
        //934/1080
    }
});