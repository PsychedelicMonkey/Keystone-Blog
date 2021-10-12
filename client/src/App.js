import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AppNavbar from './components/header/AppNavbar';
import Home from './components/Home';

const App = () => {
  return (
    <Router>
      <AppNavbar />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default App;
