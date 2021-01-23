// Import Objection Models Here!
const Book = require('../../models/Book')

// eslint-disable-next-line no-unused-vars
const addBook = async (obj, { input }, context) => {
  try {
    const book = await Book.query().insert(input).returning('*')
    return book
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error)
    throw new Error('failed to insert book')
  }
}

// This resolver object mirrors the shape of your TypeDefs
const resolver = {
  Mutation: {
    addBook,
  },
}

module.exports = resolver
