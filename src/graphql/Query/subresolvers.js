const Author = require('../../models/Author')
const Publisher = require('../../models/Publisher')
const Book = require('../../models/Book')
const Address = require('../../models/Address')

// eslint-disable-next-line no-unused-vars
const booksForAuthor = async ({ id }, params, context) => {
  try {
    const b = Book.query().where('authorId', id)
    return b
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error)
    throw new Error('failed to resolve books')
  }
}

// eslint-disable-next-line no-unused-vars
const booksForPublisher = async ({ id }, params, context) => {
  try {
    const b = Book.query().where('publisherId', id)
    return b
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error)
    throw new Error('failed to resolve books')
  }
}

// eslint-disable-next-line no-unused-vars
const address = async ({ addressId }, params, context) => {
  try {
    const a = Address.query().findOne('id', addressId)
    return a
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error)
    throw new Error('failed to get resolve address')
  }
}

// eslint-disable-next-line no-unused-vars
const author = async ({ authorId }, params, context) => {
  try {
    const a = Author.query().findOne('id', authorId)
    return a
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error)
    throw new Error('failed to resolve author')
  }
}

// eslint-disable-next-line no-unused-vars
const publisher = async ({ publisherId }, params, context) => {
  try {
    const p = Publisher.query().findOne('id', publisherId)
    return p
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error)
    throw new Error('failed to resolve publisher')
  }
}

const resolver = {
  Author: {
    books: booksForAuthor,
    address,
  },
  Publisher: {
    books: booksForPublisher,
    address,
  },
  Book: {
    author,
    publisher,
  },
}

module.exports = resolver
