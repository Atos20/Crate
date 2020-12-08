// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'

// GraphQL Crate object
// Declaration of Crate attributes (what's accessible, and what data type each one is)
// Crate type
const CrateType = new GraphQLObjectType({
  name: 'crate',
  description: 'Crate Type',

  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})

export default CrateType
