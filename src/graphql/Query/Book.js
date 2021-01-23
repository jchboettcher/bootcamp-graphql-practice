// Import Objection Models Here!
const Book = require('../../models/Book')

const allBooks = async () => {
  try {
    const books = await Book.query()
    return books
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error)
    throw new Error('failed to get books')
  }
}

// eslint-disable-next-line no-unused-vars
const bookById = async (obj, { id }, context) => {
  try {
    const book = await Book.query().findOne('id', id)
    return book
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error)
    throw new Error('failed to get book from id')
  }
}

// eslint-disable-next-line no-unused-vars
const booksByTitle = async (obj, { title }, context) => {
  try {
    const books = await Book.query().where('title', title)
    return books
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error)
    throw new Error('failed to get books from title')
  }
}

// This resolver object mirrors the shape of your TypeDefs
const resolver = {
  Query: {
    allBooks,
    bookById,
    booksByTitle,
  },
}

module.exports = resolver
