import React from 'react'
import * as ReactNavigation from 'react-navigation'
import { connect } from 'react-redux'
import AppNavigation from './AppNavigation'
import NavigationService from './NavigationService'
// here is our redux-aware smart component
function ReduxNavigation (props) {
  const { dispatch, nav } = props
  const navigation = ReactNavigation.addNavigationHelpers({
    dispatch,
    state: nav,
    ...props.nav
  })

  return <AppNavigation ref={navigatorRef=>{NavigationService.setTopLevelNavigator(navigatorRef)}} navigation={navigation} screenProps={{nav:props.nav}} />
}

const mapStateToProps = state => ({ nav: state.nav })
export default connect(mapStateToProps)(ReduxNavigation)
