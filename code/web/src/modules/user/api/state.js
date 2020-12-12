// App Imports
import { isEmpty } from '../../../setup/helpers'
import { SET_USER, LOGIN_REQUEST, LOGIN_RESPONSE, LOGOUT, ASSIGN_STYLE } from './actions'

// Initial State
export const userInitialState = {
  error: null,
  isLoading: false,
  isAuthenticated: false,
  details: null,
  isSurveyCompleted: false
}

// State
export default (state = userInitialState, action) => {
  switch (action.type) {
    case ASSIGN_STYLE:
      return {
        ...state,
        error: null,
        id: action.id,
        survey: action.survey,
        style: action.style,
        isSurveyCompleted: true
      }

    case SET_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.user),
        details: action.user,
        isSurveyCompleted: action.user.survey
      }

    case LOGIN_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: action.isLoading
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
        details: null,
        isSurveyCompleted: false,
        style: ''
      }

    default:
      return state
  }
}