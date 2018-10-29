import React, { Component } from 'react';

import { ALL_USER_ITEMS_QUERY } from '../../apollo/queries';
import LoadingScreen from '../../components/LoadingScreen';
import Profile from './Profile';
import { Query } from 'react-apollo';

class ProfileContainer extends Component {
  render() {
    return (
      <Query query={ALL_USER_ITEMS_QUERY} variables={{ id: 1 }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <LoadingScreen />;
          }
          if (error) return `Error, ${error.message}`;
          if (data) return <Profile data={data} />;
        }}
      </Query>
    );
  }
}

export default ProfileContainer;
