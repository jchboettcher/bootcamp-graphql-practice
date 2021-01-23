const { gql } = require('apollo-server-express')

module.exports = gql`
  type Query {
    allAddresses: [Address!]!
    addressById(id: ID!): Address!
    addressByAuthor(authorId: ID!): Address!
    addressByPublisher(publisherId: ID!): Address!
    allAuthors: [Author!]!
    authorById(id: ID!): Author!
    authorByBook(bookId: ID!): Author!
    allPublishers: [Publisher!]!
    publisherById(id: ID!): Publisher!
    publisherByBook(bookId: ID!): Publisher!
    allBooks: [Book!]!
    bookById(id: ID!): Book!
    booksByTitle(title: String!): [Book!]!
  }

  type Mutation {
    addAddress(input: AddAddress!): Address!
    addAuthor(input: AddAuthor!): Author!
    addPublisher(input: AddPublisher!): Publisher!
    addBook(input: AddBook!): Book!
  }

  type Address {
    id: ID!
    street: String!
    city: String!
    state: String!
    zip: String!
    createdAt: String!
    updatedAt: String!
  }

  type Author {
    id: ID!
    firstName: String!
    lastName: String!
    age: Int
    email: String
    numBooksPublished: Int!
    address: Address
    books: [Book!]!
    createdAt: String!
    updatedAt: String!
  }

  type Publisher {
    id: ID!
    company: String!
    phoneNumber: String
    numBooksPublished: Int!
    address: Address
    books: [Book!]!
    createdAt: String!
    updatedAt: String!
  }

  type Book {
    id: ID!
    title: String!
    language: String!
    numPages: Int
    datePublished: String
    bestseller: Boolean
    author: Author
    publisher: Publisher
    createdAt: String!
    updatedAt: String!
  }

  input AddAddress {
    street: String!
    city: String!
    state: String!
    zip: String!
  }

  input AddAuthor {
    firstName: String!
    lastName: String!
    age: Int
    email: String
    numBooksPublished: Int
    addressId: ID
  }

  input AddPublisher {
    company: String!
    phoneNumber: String
    numBooksPublished: Int
    addressId: ID
  }

  input AddBook {
    title: String!
    language: String!
    numPages: Int
    datePublished: String
    bestseller: Boolean
    authorId: ID!
    publisherId: ID!
  }

`
