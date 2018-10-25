import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
// @TODO: Uncomment each module as needed in your client app
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux';
// -------------------------------

import registerServiceWorker from './registerServiceWorker';
import theme from './theme';
import client from './apollo';

/**
 * @TODO: Initialize Redux Store
 *
 * Uncomment the following line when your Redux store is configured
 *
 *
 *
 * Below in your <App />, wrap a <ReduxProvider /> component around all
 * of the app's children, and pass it the imported `store` as the `store`
 * prop's value.
 */

/**
 * @TODO: Add the Viewer Context
 *
 * import { ViewerProvider } from './context/ViewerProvider'
 *
 * Below in your <App />, wrap the <ViewerProvider /> component around
 * the <BrowserRouter /> component so the router is aware of whether a
 * user is currently logged in and who that user is.
 */

// @TODO: Remove this import once you have your router working below
// -------------------------------

import './index.css';
import Layout from './routes/Layout';

const App = () => {
  return (
    <ReduxProvider store={store}>
      <MuiThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <CssBaseline />
          <Router>
            <Layout />
          </Router>
        </ApolloProvider>
      </MuiThemeProvider>
    </ReduxProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
