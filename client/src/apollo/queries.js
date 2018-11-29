import gql from 'graphql-tag';

/**
 * Item and user-related queries and mutations.
 */

const ItemFields = gql`
  fragment ItemFields on Item {
    id
    title
    imageurl
    description
    createdon
    tags {
      id
      title
    }
    owner {
      id
      fullname
      email
      bio
    }
    borrower {
      id
      fullname
      email
      bio
    }
  }
`;
export const ITEM_QUERY = gql`
  query item($id: ID!) {
    # @TODO: Query an item by its id and return the ItemFields fragment.
    item(id: $id) {
      ...ItemFields
    }
  }
  ${ItemFields}
`;

export const ALL_ITEMS_QUERY = gql`
  query items($filter: ID) {
    # @TODO: Query items (optionally by tag id) and return the ItemFields fragment.
    items(filter: $filter) {
      ...ItemFields
    }
  }
  ${ItemFields}
`;

export const ALL_USER_ITEMS_QUERY = gql`
  query user($id: ID!) {
    user(id: $id) {
      id
      email
      fullname
      bio
      items {
        ...ItemFields
      }
      borrowed {
        ...ItemFields
      }
    }
  }
  ${ItemFields}
`;

export const ALL_TAGS_QUERY = gql`
  query tags {
    tags {
      title
      id
    }
  }
`;

export const ADD_ITEM_MUTATION = gql`
  mutation addItem($NewItemInput: NewItemInput!) {
    addItem(item: $NewItemInput) {
      title
      description
    }
  }
`;

export const VIEWER_QUERY = gql`
  query viewer {
    viewer {
      id
      fullname
      email
    }
  }
`;
export const LOGOUT_MUTATION = gql`
  mutation {
    logout
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation signup($input: SignUpInput!) {
    signup(input: $input) {
      id
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      id
      fullname
    }
  }
`;
