// Import Objection Models Here!
const Address = require('../../models/Address')

// eslint-disable-next-line no-unused-vars
const addAddress = async (obj, { input }, context) => {
  try {
    const address = await Address.query().insert(input).returning('*')
    return address
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error)
    throw new Error('failed to insert address')
  }
}

// This resolver object mirrors the shape of your TypeDefs
const resolver = {
  Mutation: {
    addAddress,
  },
}

module.exports = resolver
