// App Imports
import Login from '../../modules/user/Login'
import Signup from '../../modules/user/Signup'
import Profile from '../../modules/user/Profile'
import Subscriptions from '../../modules/user/Subscriptions'
// add a new import for the StyleSurvey Component here

// User routes
export default {
  login: {
    path: '/user/login',
    component: Login
  },

  signup: {
    path: '/user/signup',
    component: Signup
  },

  profile: {
    path: '/user/profile',
    component: Profile,
    auth: true
  },

  subscriptions: {
    path: '/user/subscriptions',
    component: Subscriptions,
    auth: true
  }

  // Add a new export for StyleSurvey
  // It will have the path /style-preferences
  // It will render StyleSurvey component
  // auth is true
}
