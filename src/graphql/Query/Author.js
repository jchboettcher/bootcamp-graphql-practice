// Import Objection Models Here!
const Author = require('../../models/Author')
const Book = require('../../models/Book')

const allAuthors = async () => {
  try {
    const authors = await Author.query()
    return authors
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error)
    throw new Error('failed to get authors')
  }
}

// eslint-disable-next-line no-unused-vars
const authorById = async (obj, { id }, context) => {
  try {
    const author = await Author.query().findOne('id', id)
    return author
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error)
    throw new Error('failed to get author from id')
  }
}

// eslint-disable-next-line no-unused-vars
const authorByBook = async (obj, { bookId }, context) => {
  try {
    const { authorId } = await Book.query().findOne('id', bookId)
    const author = await Author.query().findOne('id', authorId)
    return author
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error)
    throw new Error('failed to get author from book')
  }
}

// This resolver object mirrors the shape of your TypeDefs
const resolver = {
  Query: {
    allAuthors,
    authorById,
    authorByBook,
  },
}

module.exports = resolver
