// Import Objection Models Here!
const Publisher = require('../../models/Publisher')

// eslint-disable-next-line no-unused-vars
const addPublisher = async (obj, { input }, context) => {
  try {
    const publisher = await Publisher.query().insert(input).returning('*')
    return publisher
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error)
    throw new Error('failed to insert publisher')
  }
}

// This resolver object mirrors the shape of your TypeDefs
const resolver = {
  Mutation: {
    addPublisher,
  },
}

module.exports = resolver
