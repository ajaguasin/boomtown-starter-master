import React, { Component } from 'react';

import { ALL_ITEMS_QUERY } from '../../apollo/queries';
import Items from './Items';
import LoadingScreen from '../../components/LoadingScreen';
import { Query } from 'react-apollo';

class ItemsContainer extends Component {
  render() {
    return (
      <Query query={ALL_ITEMS_QUERY} variables={{ filter: -1 }}>
        {({ loading, error, data }) => {
          if (loading) return <LoadingScreen />;
          else {
            if (error) return `Error, ${error.message}`;
            if (data) return <Items data={data} />;
          }
        }}
      </Query>
    );
  }
}

export default ItemsContainer;
