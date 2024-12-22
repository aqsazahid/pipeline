import { gql } from "@apollo/client";

// Mutation to add a new book
export const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(title: $title, author: $author, published: $published, genres: $genres) {
    title
    author {
      name
    }
    published
    genres
  }
}
`;

export const LOGIN_MUTATION = gql`
  mutation{
  login(username: "user", password: "password") {
    value
  }
}
`

// Queries to fetch all books and authors
export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author {
        name
      }
    }
  }
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const SET_BIRTH_YEAR = gql`
  mutation SetBirthYear($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;
