// App Imports
import { isEmpty } from '../../../setup/helpers'
import { SET_USER, LOGIN_REQUEST, LOGIN_RESPONSE, LOGOUT } from './actions'

// Initial State
export const userInitialState = {
  error: null,
  isLoading: false,
  isAuthenticated: false,
  details: null
  //add a property isSurveyCompleted
}

// State

//depending on the action.type invoked by the 
//dispatcher the reducer will find the case needed
//then it will modify the state accordingly
export default (state = userInitialState, action) => {
  switch (action.type) {
    case SET_USER://check for the user's token, and if it exists 
      return {
        ...state,
        isAuthenticated: !isEmpty(action.user),//helper function that checks for properties
        details: action.user,
      }

    case LOGIN_REQUEST://case for when the user requests to log in
      return {
        ...state,//makes a copy of the initial state
        error: null,// no error
        isLoading: action.isLoading //loading is true
      }

    case LOGIN_RESPONSE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }

    case LOGOUT:
      return {
        ...state,
        error: null,
        isLoading: false,
        isAuthenticated: false,
        details: null
      }

    default://returs the original state of the state
      return state
  }
}