import React, { Component } from 'react';

import { ALL_USER_ITEMS_QUERY } from '../../apollo/queries';
import LoadingScreen from '../../components/LoadingScreen';
import Profile from './Profile';
import { Query } from 'react-apollo';
import { ViewerContext } from '../../context/ViewerProvider';
class ProfileContainer extends Component {
  render() {
    return (
      <ViewerContext.Consumer>
        {({ viewer }) => {
          return (
            <Query query={ALL_USER_ITEMS_QUERY} variables={{ id: viewer.id }}>
              {({ loading, error, data }) => {
                if (loading) {
                  return <LoadingScreen />;
                }
                if (error) return `Error, ${error.message}`;
                if (data) return <Profile data={data} />;
              }}
            </Query>
          );
        }}
      </ViewerContext.Consumer>
    );
  }
}

export default ProfileContainer;
