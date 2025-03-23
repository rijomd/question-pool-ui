import React from "react";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";

import { ADD_BOOKS, GET_BOOKS, GET_BOOKS_BY_ID } from "./mutations";

export const AddBookForm = () => {
  const [addBooks, { data: mutationData }] = useMutation(ADD_BOOKS);
  const { data: booksData } = useQuery(GET_BOOKS);
  const { data: book,refetch, networkStatus  } = useQuery(GET_BOOKS_BY_ID,{
    variables: { id:1 },
    // pollInterval: 500, for timeout
  });


  const getBooks = (e) => {
    e.preventDefault();
    // same as rest but only post methods.
    addBooks({
      variables: {
        bookDto: {
          id: 7,
          name: "Test",
          pageCount: 333,
          authorId: 3,
          placeId: 17,
        },
      },
    });
  };

  return (
    <div>
      <button onClick={getBooks}>books</button>
    </div>
  );
};
