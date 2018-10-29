import React, { Component } from 'react';

import { ALL_TAGS_QUERY } from '../../apollo/queries';
import LoadingScreen from '../../components/LoadingScreen';
import { Query } from 'react-apollo';
import Share from './Share';

class ShareContainer extends Component {
  render() {
    return (
      <Query query={ALL_TAGS_QUERY} variables={{ filter: -1 }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <LoadingScreen />;
          }
          if (error) return `Error, ${error.message}`;
          if (data) return <Share tags={data} />;
        }}
      </Query>
    );
  }
}

export default ShareContainer;
