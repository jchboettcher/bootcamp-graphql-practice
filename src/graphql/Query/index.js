const merge = require('lodash.merge')
const Address = require('./Address')
const Author = require('./Author')
const Publisher = require('./Publisher')
const Book = require('./Book')
const Subresolvers = require('./subresolvers')

const resolvers = [Address, Author, Publisher, Book, Subresolvers]

module.exports = merge(...resolvers)
