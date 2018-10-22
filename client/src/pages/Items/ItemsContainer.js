import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Items from './Items';
import { ALL_ITEMS_QUERY } from '../../apollo/queries';
import { ALL_USER_ITEMS_QUERY } from '../../apollo/queries';
class ItemsContainer extends Component {
  render() {
    return (
      <Query query={ALL_ITEMS_QUERY} variables={{ filter: -1 }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading'; //! Loading component
          if (error) return `Error, ${error.message}`;
          if (data) {
            return <Items data={data} />;
          }
        }}
      </Query>
    );
  }
}

export default ItemsContainer;
