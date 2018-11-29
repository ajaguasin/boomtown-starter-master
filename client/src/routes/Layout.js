import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Home from '../pages/Home';
import Items from '../pages/Items';
import NavComponent from '../components/NavComponent';
import Profile from '../pages/Profile';
import Share from '../pages/Share';
import { ViewerContext } from '../context/ViewerProvider';
import LoadingScreen from '../components/LoadingScreen';

export default () => (
  <ViewerContext.Consumer>
    {({ viewer, loading }) => {
      if (loading) return <LoadingScreen />;
      if (!viewer) {
        return (
          <Switch>
            <Route exact path="/welcome" name="home" component={Home} />
            <Redirect from="*" to="/welcome" />
          </Switch>
        );
      }
      return (
        <React.Fragment>
          <NavComponent />
          <Switch>
            <Route exact path="/items" name="items" component={Items} />
            <Route exact path="/profile" name="profile" component={Profile} />
            <Route
              exact
              path="/profile/:userId"
              name="profile"
              component={Profile}
            />
            <Route exact path="/share" name="share" component={Share} />
            <Redirect from="*" to="/items" />
          </Switch>
        </React.Fragment>
      );
    }}
  </ViewerContext.Consumer>
);
