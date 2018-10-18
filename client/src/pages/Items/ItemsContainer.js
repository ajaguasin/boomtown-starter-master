import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Items from './Items';
import { ITEM_QUERY } from '../../apollo/queries';

// const GET_ITEMS = gql`
//   {
//     items(filter: 2) {
//       id
//       title
//       description
//     }
//   }
// `;

class ItemsContainer extends Component {
  render() {
    return (
      <Query query={ITEM_QUERY} variables={{ filter: 1 }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading';
          if (error) return `Error, ${error.message}`;
          if (data) {
            console.log(data);
            return <Items data={data} />;
          }
        }}
      </Query>
    );
  }
}

export default ItemsContainer;
