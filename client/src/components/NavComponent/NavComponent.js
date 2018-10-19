import React, { Component } from 'react';
import MenuComponent from '../MenuComponent';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import styles from './styles';
import { withRouter } from 'react-router-dom';

class NavComponent extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      this.props.location.pathname == '/welcome' && ( //set to != after editing
        <AppBar className={this.props.classes.root}>
          This is the AppBar
          <MenuComponent />
        </AppBar>
      )
    );
  }
}

export default withRouter(withStyles(styles)(NavComponent));
