// Imports
// This is importing the type of things you need so that you are able to create the methods below.
import { GraphQLInt, GraphQLString, GraphQLList } from 'graphql'

// App Imports
// this is importing the crate type and also importing the getAll and getById queries from the resolver file.
import CrateType from './types'
import { getAll, getById } from './resolvers'

// Crates All
// Gathers all of the crates and presents them. 
export const crates = {
  type: new GraphQLList(CrateType),
  args: {
    orderBy: { type: GraphQLString }
  },
  resolve: getAll
}

// Crate By ID
// This one below is finding a crate based off of it's ID
export const crateById = {
  type: CrateType,
  args: {
    crateId: { type: GraphQLInt }
  },
  resolve: getById
}

//annotations: add query in here for crate styles? 