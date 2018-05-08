/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/
import NavigationService from '../Navigation/NavigationService'
import { call, put } from 'redux-saga/effects'
import { NavigationActions, withNavigation } from 'react-navigation'
// import NavigationActions from '../Redux/NavigationRedux'
// import { NavigationSelectors } from '../Redux/NavigationRedux'
import otron from 'reactotron-react-native'

export function* navigate(action) {
  // otron.log({navigateaction:action})
  const { type, payload } = action
  const routes = NavigationService.getTopLevelNavigator().props.navigation.routes
  // otron.log({navigroutes:routes})
  let contains = false
  let _key = null
  let index = 0
  for (let route of routes) {
    const {routeName} = route
    if (routeName == payload) {
      contains  = true
      _key      = routes[index+1].key // thanks to react navigation tricky go back from key...
      break;
    }
    index++
  }
  if (contains) {
    // otron.log({goback:_key,payload:payload})
    yield put(NavigationActions.back({
      key: _key,
      immediate: false
    }))
  } else {
    yield put(NavigationActions.navigate({
      routeName: payload,
      key: payload
    }))
  }

}
