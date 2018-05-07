import AppNavigation from '../Navigation/AppNavigation'
import otron from 'reactotron-react-native'
// import { createActions } from 'reduxsauce'

// /* ------------- Types and Action Creators ------------- */

// const { Types, Creators } = createActions({
//   startup: null
// })

// export const StartupTypes = Types
// export default Creators

export const SHOW = "CustomNavigate/Show"

export const show = payload => {
  return ({
    type:SHOW,
    payload:payload
  })
}

export const reducer = (state, action) => {
  const newState = AppNavigation.router.getStateForAction(action, state)
  return newState || state
}
