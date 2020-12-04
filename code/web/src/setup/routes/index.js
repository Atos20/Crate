// App Imports
import { APP_URL_API } from '../config/env'
import admin from './admin'
import home from './home'
import user from './user'
import product from './product'
import crate from './crate'
// import survey file import here

// Combined routes
// Add a new survey route here. They are all assigned into a new Object that is then used inside of the route. It will determine which user is a user and which user is an admint o render the appriopriate view for each role.
export const routes = Object.assign(admin, home, user, product, crate)

// API Routes
// There is only one endpoint that is being used as the api and that is assigned here to be used through each area of the app
export const routeApi = APP_URL_API

// Image
// There is only one endpoint that is being used as the api and that is assigned here to be used through each area of the app
export const routeImage = APP_URL_API
