import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router';

import Home from '../pages/Home';
import Items from '../pages/Items';
import NavComponent from '../components/NavComponent';
import Profile from '../pages/Profile';
import Share from '../pages/Share';
import { ViewerContext } from '../context/ViewerProvider';

export default () => (
  <ViewerContext.Consumer>
    {({ viewer, loading }) => (
      <Fragment>
        {viewer ? (
          <Fragment>
            <NavComponent />
            <Switch>
              <Route exact path="/items" component={Items} />
              <Route exact path="/share" component={Share} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/profile/:id" component={Profile} />

              <Redirect from="*" to="/items" />

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
        ) : (
          <Switch>
            <Route exact path="/welcome" component={Home} />
            {/* <Redirect from="*" to="/welcome" /> */}
          </Switch>
        )}
      </Fragment>
    )}
  </ViewerContext.Consumer>
);
