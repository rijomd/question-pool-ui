import { gql } from "@apollo/client";

export const ADD_BOOKS = gql`
  mutation AddBooks($bookDto: BookDto!) {
    addBooks(bookDto: $bookDto) {
      id
      name
      pageCount
      author {
        name
      }
      place {
        name
      }
    }
  }
`;

export const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      name
      pageCount
      author {
        name
      }
    }
  }
`;

export const GET_BOOKS_BY_ID = gql`
  query BookById($id: Int!) {
    bookById(id: $id) {
      id
      name
      pageCount
      author {
        name
      }
    }
  }
`;
