import './index.css';

import { ApolloProvider } from 'react-apollo';
import CssBaseline from '@material-ui/core/CssBaseline';
import Layout from './routes/Layout';
import { MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import ViewerProvider from './context/ViewerProvider';
import client from './apollo';
import registerServiceWorker from './registerServiceWorker';
import store from './redux';
import theme from './theme';

const App = () => {
  return (
    <ReduxProvider store={store}>
      <MuiThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <ViewerProvider>
            <CssBaseline />
            <Router>
              <Layout />
            </Router>
          </ViewerProvider>
        </ApolloProvider>
      </MuiThemeProvider>
    </ReduxProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
