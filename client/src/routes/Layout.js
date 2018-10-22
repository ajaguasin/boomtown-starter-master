import React, { Fragment } from 'react';
import { Redirect, Route, Switch, Link } from 'react-router';
import NavComponent from '../components/NavComponent';
import Items from '../pages/Items';
import Home from '../pages/Home';
import Share from '../pages/Share';
import Profile from '../pages/Profile';
import ItemsContainer from '../pages/Items';

export default () => (
  <Fragment>
    <NavComponent />
    <Switch>
      <Route exact path="/items" component={ItemsContainer} />
      <Route exact path="/welcome" component={Home} />
      <Route exact path="/share" component={Share} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/profile/:id" component={Profile} />

      <Redirect to="/welcome" />

      {/**
       * @TODO: Define routes here for: /items, /profile, /profile/:userid, and /share
       *
       * Provide a wildcard redirect to /items for any undefined route using <Redirect />.
       *
       * Later, we'll add logic to send users to one set of routes if they're logged in,
       * or only view the /welcome page if they are not.
       */}
    </Switch>
  </Fragment>
);
