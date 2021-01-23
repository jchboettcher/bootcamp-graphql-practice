// Import Objection Models Here!
const Author = require('../../models/Author')

// eslint-disable-next-line no-unused-vars
const addAuthor = async (obj, { input }, context) => {
  try {
    const author = await Author.query().insert(input).returning('*')
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
