import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { ApolloProvider } from "@apollo/client";

import App from './App.jsx'
import { store } from "./store/Store.js"
import client from './service/apolloClient.js';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
   </ApolloProvider>
    </Provider>
  </React.StrictMode>,
)
