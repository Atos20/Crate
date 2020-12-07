// Here we are importing the bcrypt gem that is necessary in order to create a user and login. 
// Imports
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// this is importing the paramaters and model information for a user. 
// App Imports
import serverConfig from '../../config/server'
import params from '../../config/params'
import models from '../../setup/models'

// Create
// this method is creating a new user and/or throwing an error if there are errors with the creation 
export async function create(parentValue, { name, email, password }) {
  // Users exists with same email check
  const user = await models.User.findOne({ where: { email } })

  if (!user) {
    // User does not exists
    const passwordHashed = await bcrypt.hash(password, serverConfig.saltRounds)

    return await models.User.create({
      name,
      email,
      password: passwordHashed
    })
  } else {
    // User exists
    throw new Error(`The email ${ email } is already registered. Please try to login.`)
  }
}

// sets up the method for loging in. 
export async function login(parentValue, { email, password }) {
  const user = await models.User.findOne({ where: { email } })

  if (!user) {
    // User does not exists
    throw new Error(`We do not have any user registered with ${ email } email address. Please signup.`)
  } else {
    const userDetails = user.get()

    // User exists
    const passwordMatch = await bcrypt.compare(password, userDetails.password)

    if (!passwordMatch) {
      // Incorrect password
      throw new Error(`Sorry, the password you entered is incorrect. Please try again.`)
    } else {
      const userDetailsToken = {
        id: userDetails.id,
        name: userDetails.name,
        email: userDetails.email,
        role: userDetails.role
      }

      return {
        user: userDetails,
        token: jwt.sign(userDetailsToken, serverConfig.secret)
      }
    }
  }
}

// finds a user based off of their ID
// Get by ID
export async function getById(parentValue, { id }) {
  return await models.User.findOne({ where: { id } })
}

// brings up a list of all users
// Get all
export async function getAll() {
  return await models.User.findAll()
}

// allows deletion of a user
// Delete
export async function remove(parentValue, { id }) {
  return await models.User.destroy({ where: { id } })
}

// returns a users gender
// User genders
export async function getGenders() {
  return Object.values(params.user.gender)
}
// Annotations: add resolver function here for finding clothing style 