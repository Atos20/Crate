// Imports
import { combineReducers } from 'redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

// App Imports
import common from '../modules/common/api/state'
import user from '../modules/user/api/state'
import * as product from '../modules/product/api/state'
import * as subscription from '../modules/subscription/api/state'
import * as crate from '../modules/crate/api/state'

// App Reducer
// The app reducer combines all of the individual reducers into one appReducer that is used for redux store
const appReducer = combineReducers({
  common,
  user,
  ...product,
  ...subscription,
  ...crate
})

// Root Reducer
// rootReducer is being called to reset the state of all reducers to their default states if the action type is RESET. If it is not, then it will pass the initial or update state to all reducers.
export const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined
  }

  return appReducer(state, action)
}

// Load initial state from server side
let initialState
// This will also reset the window object to its initial state like when the app first launches if window is found to be undefined at any point.
if (typeof window !== 'undefined') {
  initialState = window.__INITIAL_STATE__
  delete window.__INITIAL_STATE__
}

// Store
// creates the store that reducer needs in order to have all of the states and apps work correctly through the app. Thunk allows for redux to be used async rather than synchronously, which is why deconstructing and setting our dispatches directly inside of their functions works as they do in this app.
export const store = createStore(
  rootReducer,
  initialState,

  composeWithDevTools(
    applyMiddleware(thunk),
  )
)