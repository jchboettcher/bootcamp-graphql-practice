// Import Objection Models Here!
const Publisher = require('../../models/Publisher')
const Book = require('../../models/Book')

const allPublishers = async () => {
  try {
    const publishers = await Publisher.query()
    return publishers
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error)
    throw new Error('failed to get publishers')
  }
}

// eslint-disable-next-line no-unused-vars
const publisherById = async (obj, { id }, context) => {
  try {
    const publisher = await Publisher.query().findOne('id', id)
    return publisher
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error)
    throw new Error('failed to get publisher from id')
  }
}

// eslint-disable-next-line no-unused-vars
const publisherByBook = async (obj, { bookId }, context) => {
  try {
    const { publisherId } = await Book.query().findOne('id', bookId)
    const publisher = await Publisher.query().findOne('id', publisherId)
    return publisher
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error)
    throw new Error('failed to get publisher from book')
  }
}

// This resolver object mirrors the shape of your TypeDefs
const resolver = {
  Query: {
    allPublishers,
    publisherById,
    publisherByBook,
  },
}

module.exports = resolver
