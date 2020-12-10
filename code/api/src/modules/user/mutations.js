// Imports
import { GraphQLString, GraphQLInt, GraphQLBoolean } from 'graphql'

// App Imports
import { UserType } from './types'
import { create, remove, update } from './resolvers'

// Create
export const userSignup = {
  type: UserType,
  args: {
    name: {
      name: 'name',
      type: GraphQLString
    },

    email: {
      name: 'email',
      type: GraphQLString
    },

    password: {
      name: 'password',
      type: GraphQLString
    }
  },
  resolve: create
}

// Remove
export const userRemove = {
  type: UserType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  resolve: remove
}

// Update
export const userUpdate = {
  type: UserType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    },
    style: {
      name: 'style',
      type: GraphQLString
    },
    survey: {
      name: 'survey',
      type: GraphQLBoolean
    }
  },
  resolve: update
}