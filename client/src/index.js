import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';

const client = new ApolloClient({
  uri: 'http://localhost:5000/admin/api',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
