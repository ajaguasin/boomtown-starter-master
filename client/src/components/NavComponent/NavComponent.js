import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuComponent from '../MenuComponent';
import React, { Component } from 'react';
import styles from './styles';
import SvgIcon from '@material-ui/core/SvgIcon';

class NavComponent extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      this.props.location.pathname == '/welcome' && ( //set to != after editing
        <AppBar className={this.props.classes.root}>
          <IconButton aria-label="Delete">
            <SvgIcon>
              <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
            </SvgIcon>
          </IconButton>
          <MenuComponent />
        </AppBar>
      )
    );
  }
}

export default withRouter(withStyles(styles)(NavComponent));
