// Import Objection Models Here!
const Book = require('../../models/Book')
const Author = require('../../models/Author')
const Publisher = require('../../models/Publisher')
const Address = require('../../models/Address')

// eslint-disable-next-line no-unused-vars
const addBook = async (obj, { input }, context) => {
  try {
    const { author, publisher, ...rest } = input
    const { address: authorAddress, ...authorParams } = author
    const numAuth = await Author.query().where(authorParams).resultSize()
    let authorId = ''
    if (numAuth === 0) {
      if (authorAddress) {
        const numAddr = await Address.query().where(authorAddress).resultSize()
        let addressId = ''
        if (numAddr === 0) {
          addressId = (await Address.query().insert(authorAddress).returning('*')).id
        } else {
          addressId = (await Address.query().findOne(authorAddress)).id
        }
        authorParams.addressId = addressId
      }
      authorParams.numBooksPublished = 1
      authorId = (await Author.query().insert(authorParams).returning('*')).id
    } else {
      const auth = await Author.query().findOne(authorParams)
      await Author.query().findOne(authorParams).patch({
        numBooksPublished: auth.numBooksPublished + 1,
      })
      authorId = auth.id
    }
    const { address: publisherAddress, ...publisherParams } = publisher
    const numPubl = await Publisher.query().where(publisherParams).resultSize()
    let publisherId = ''
    if (numPubl === 0) {
      if (publisherAddress) {
        const numAddr = await Address.query().where(publisherAddress).resultSize()
        let addressId = ''
        if (numAddr === 0) {
          addressId = (await Address.query().insert(publisherAddress).returning('*')).id
        } else {
          addressId = (await Address.query().findOne(publisherAddress)).id
        }
        publisherParams.addressId = addressId
      }
      publisherParams.numBooksPublished = 1
      publisherId = (await Publisher.query().insert(publisherParams).returning('*')).id
    } else {
      const publ = await Publisher.query().findOne(publisherParams)
      await Publisher.query().findOne(publisherParams).patch({
        numBooksPublished: publ.numBooksPublished + 1,
      })
      publisherId = publ.id
    }
    const book = await Book.query().insert({ authorId, publisherId, ...rest }).returning('*')
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
