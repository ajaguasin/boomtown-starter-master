import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuComponent from '../MenuComponent';
import React, { Component } from 'react';
import styles from './styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import BoomTownIcon from '../../images/boomtown.svg';

class NavComponent extends Component {
  render() {
    return (
      this.props.location.pathname != '/welcome' && ( //set to != after editing
        <AppBar className={this.props.classes.root}>
          <IconButton aria-label="Delete">B</IconButton>
          <MenuComponent />
        </AppBar>
      )
    );
  }
}

export default withRouter(withStyles(styles)(NavComponent));
