import React, { Component } from 'react';
import Profile from './Profile';
import { Query } from 'react-apollo';
import { ALL_USER_ITEMS_QUERY } from '../../apollo/queries';

class ProfileContainer extends Component {
  render() {
    return (
      <Query query={ALL_USER_ITEMS_QUERY} variables={{ id: 1 }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading'; //! Loading component
          if (error) return `Error, ${error.message}`;
          if (data) return <Profile data={data} />;
        }}
      </Query>
    );
  }
}

export default ProfileContainer;
