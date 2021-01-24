// Import Objection Models Here!
const Publisher = require('../../models/Publisher')
const Address = require('../../models/Address')

// eslint-disable-next-line no-unused-vars
const addPublisher = async (obj, { input }, context) => {
  try {
    const { address, ...rest } = input
    if (address) {
      const numAddr = await Address.query().where(address).resultSize()
      let addressId = ''
      if (numAddr === 0) {
        addressId = (await Address.query().insert(address).returning('*')).id
      } else {
        addressId = (await Address.query().findOne(address)).id
      }
      rest.addressId = addressId
    }
    const publisher = await Publisher.query().insert(rest).returning('*')
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
