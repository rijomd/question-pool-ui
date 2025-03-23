import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getToken } from "./AuthMethods";

const token = getToken();

const httpLink = new HttpLink({
  uri: "http://localhost:8086/graphql",
});

// Add the authorization token to the headers
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
