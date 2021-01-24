// Import Objection Models Here!
const Author = require('../../models/Author')
const Address = require('../../models/Address')

// eslint-disable-next-line no-unused-vars
const addAuthor = async (obj, { input }, context) => {
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
    const author = await Author.query().insert(rest).returning('*')
    return author
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error)
    throw new Error('failed to insert author')
  }
}

// This resolver object mirrors the shape of your TypeDefs
const resolver = {
  Mutation: {
    addAuthor,
  },
}

module.exports = resolver
