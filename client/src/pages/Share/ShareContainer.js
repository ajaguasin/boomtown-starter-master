import React, { Component } from 'react';
import Share from './Share';
import { Query } from 'react-apollo';

import { ALL_TAGS_QUERY } from '../../apollo/queries';

class ShareContainer extends Component {
  render() {
    return (
      <Query query={ALL_TAGS_QUERY} variables={{ filter: -1 }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading'; //! Loading component
          if (error) return `Error, ${error.message}`;
          if (data) return <Share tags={data} />;
        }}
      </Query>
    );
  }
}

export default ShareContainer;
