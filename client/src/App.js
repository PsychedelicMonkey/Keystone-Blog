import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AppNavbar from './components/header/AppNavbar';
import Category from './components/Category';
import Home from './components/Home';
import Post from './components/Post';

const App = () => {
  return (
    <Router>
      <AppNavbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/posts/:id" component={Post} />
        <Route exact path="/categories/:name" component={Category} />
      </Switch>
    </Router>
  );
};

export default App;
