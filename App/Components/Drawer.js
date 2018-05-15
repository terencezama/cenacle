import React, { Component } from 'react';
import {
    View, Text, ScrollView, Button, SafeAreaView, TouchableOpacity
    , StyleSheet, Image, FlatList
} from 'react-native';
import { DrawerItems } from 'react-navigation'
import otron from 'reactotron-react-native'
import Colors from '../Themes/Colors'
import FAIcon from 'react-native-vector-icons/FontAwesome';
import Images from '../Themes/Images'
import firebase from 'react-native-firebase'
import Menu from '../Config/Menu'
import DrawerItem from '../Components/DrawerItem'
import {reset} from '../Redux/NavigationRedux'
import { connect } from 'react-redux'
class Drawer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    componentWillMount() {
        // otron.log(Menu['admin'].EventFormScreen.screen.navigationOptions(this.props.navigation))
        // otron.log(this.props.navigation)


        const { uid } = firebase.auth().currentUser
        otron.log({ user: uid })
        const details = firebase.firestore().collection('cenacle').doc('user').collection('details')
        details.doc(uid).get()
            .then(doc => {
                const { role } = doc.data()
                menu = Menu[role]
                const _data = Object.keys(menu).map(key => {
                    let title = 'Fake'
                    if (typeof menu[key].screen.navigationOptions == 'function') {
                        title = menu[key].screen.navigationOptions(this.props.navigation).title
                        // otron.log(menu[key].screen.navigationOptions(null))
                    } else {
                        title = menu[key].screen.navigationOptions.title
                    }

                    return { key: key, title: title, active: false }
                })
                // otron.log(_data)
                // this.setState({data:_data})
                this._setActive(_data)

            })
            .catch(error => {
                otron.log({ error })
            })

    }

    _setActive = adata => {
        const index = this.props.navigation.state.index
        const _data = adata || this.state.data
        const data = _data.slice(0)
        // otron.log(_data)
        for (let i in data) {
            data[i].active = false
        }
        data[index].active = true
        // otron.log(data)
        this.setState({ data: data })
    }

    componentWillReceiveProps() {
        // otron.log(this.props.navigation.state)
        // this.setState({index:this.props.navigation.index})
        this._setActive()
    }

    _logout= ()=>{
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
                <Text style={styles.text}>{'Logout'}</Text>
            </TouchableOpacity>
        )
    }
    render() {
        // const {data} = this.state
        return (
            <ScrollView>
                <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always', horizontal: 'never' }}>
                    <Image style={styles.image} source={Images.logo} resizeMode='contain' />
                    {/* <DrawerItems {...this.props} /> */}
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item, index }) => {
                            return (<DrawerItem item={item} index={index} onPress={() => { this.props.navigation.navigate(item.key) }} />)
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
        reset:payload => dispatch(reset(payload))
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
        height: 200,
        width: 200,
        alignSelf: 'center',
    }
});