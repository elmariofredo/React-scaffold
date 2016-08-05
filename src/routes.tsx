import * as React from 'react';
import { hashHistory, IndexRoute, Router, Route } from 'react-router';

import { App } from './App';
import { Home } from './home';
import { About } from './about';
import { FAQ } from './faq';

export const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="about" component={About}/>
      <Route path="faq" component={FAQ}/>
    </Route>
  </Router>
);
