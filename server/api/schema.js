const { gql } = require('apollo-server-express');

module.exports = gql`
  #scalar Upload

  #scalar Date

  type Item {
    id: ID!
    title: String!
    imageurl: String
    description: String!
    owner: User!
    tags: [Tag]
    createdon: String! #Date!
    borrower: User
  }

  type User {
    id: ID!
    email: String!
    fullname: String!
    bio: String
    items: [Item]
    borrowed: [Item]
  }

  type Tag {
    id: ID!
    title: String!
  }

  type File {
    id: ID!
    filename: String!
    mimetype: String!
    encoding: String!
    itemid: ID!
  }

  input AssignedTag {
    id: ID!
    title: String!
  }

  input AssignedBorrower {
    id: ID!
  }

  input NewItemInput {
    title: String!
    description: String
    tags: [AssignedTag]!
  }

  type Query {
    user(id: ID!): User
    viewer: User
    items(filter: ID): [Item]
    item(id: ID): Item
    tags: [Tag]
  }

  type Mutation {
    addItem(item: NewItemInput!, image: String): Item
    signup(fullname: String, email: String, bio: String, password: String): User
    login(email: String, password: String): User
    logout: Boolean
  }
`;
