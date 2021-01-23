// Import Objection Models Here!
const Address = require('../../models/Address')
const Author = require('../../models/Author')
const Publisher = require('../../models/Publisher')

const allAddresses = async () => {
  try {
    const addresses = await Address.query()
    return addresses
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error)
    throw new Error('failed to get addresses')
  }
}

// eslint-disable-next-line no-unused-vars
const addressById = async (obj, { id }, context) => {
  try {
    const address = await Address.query().findOne('id', id)
    return address
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error)
    throw new Error('failed to get address from id')
  }
}

// eslint-disable-next-line no-unused-vars
const addressByAuthor = async (obj, { authorId }, context) => {
  try {
    const { addressId } = await Author.query().findOne('id', authorId)
    const address = await Address.query().findOne('id', addressId)
    return address
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error)
    throw new Error('failed to get address from author')
  }
}

// eslint-disable-next-line no-unused-vars
const addressByPublisher = async (obj, { publisherId }, context) => {
  try {
    const { addressId } = await Publisher.query().findOne('id', publisherId)
    const address = await Address.query().findOne('id', addressId)
    return address
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error)
    throw new Error('failed to get address from publisher')
  }
}

// This resolver object mirrors the shape of your TypeDefs
const resolver = {
  Query: {
    allAddresses,
    addressById,
    addressByAuthor,
    addressByPublisher,
  },
}

module.exports = resolver
