import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
} from "@apollo/client";
import Cookies from "js-cookie";

console.log(process.env.NEXT_PUBLIC_SERVER_URI);

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_SERVER_URI,
});

const authMiddleware = new ApolloLink((oparetion, forward) => {
  oparetion.setContext({
    headers: {
      accesstoken: Cookies.get("access_token"),
      refreshtoken: Cookies.get("refresh_token"),
    },
  });
  return forward(oparetion);
});

export const graphqlClient = new ApolloClient({
  link: authMiddleware.concat(httpLink),
  cache: new InMemoryCache(),
});
