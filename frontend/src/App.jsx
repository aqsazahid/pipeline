import { useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
  headers: {
    authorization: localStorage.getItem("user-token") || "",
  }
});
const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(localStorage.getItem("user-token"));
  const logout = () => {
    setToken(null);
    localStorage.removeItem("user-token");
  };

  return (
    <ApolloProvider client={client}>
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
            <>
              <button onClick={() => setPage("add")}>add book</button>
              <button onClick={logout}>logout</button>
            </>
          ) : (
            <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />
      <LoginForm show ={page === "login"} />
    </div>
    </ApolloProvider>
  );
};

export default App;
