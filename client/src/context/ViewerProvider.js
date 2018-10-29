import { Query, renderToStringWithData } from 'react-apollo';
import React, { Component, Fragment } from 'react';

import LoadingScreen from '../components/LoadingScreen';
import { VIEWER_QUERY } from '../apollo/queries';

export const ViewerContext = React.createContext();

export default class ViewerProvider extends Component {
  render() {
    return (
      <Query query={VIEWER_QUERY}>
        {({ data, loading, error }) => {
          if (loading) {
            <LoadingScreen />;
          }

          if (error) {
            throw error;
          }

          if (data) {
            const viewer = data && data.viewer ? data.viewer : null;
            console.log(viewer);
            return (
              <ViewerContext.Provider value={{ viewer, loading }}>
                {this.props.children}
              </ViewerContext.Provider>
            );
          }
        }}
      </Query>
    );
  }
}
