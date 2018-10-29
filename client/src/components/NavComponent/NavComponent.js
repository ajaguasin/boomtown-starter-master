import { AppBar, Button, IconButton, withStyles } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
import React, { Component } from 'react';

import AddIcon from '@material-ui/icons/AddCircle';
import BoomtownLogo from '../../images/boomtown.svg';
import MenuComponent from '../MenuComponent';
import styles from './styles';

class NavComponent extends Component {
  render() {
    const { classes } = this.props;
    return (
      this.props.location.pathname !== '/welcome' && (
        <AppBar className={classes.root}>
          <IconButton aria-label="Delete" to="/items" component={Link}>
            <img className={classes.img} src={BoomtownLogo} alt="logo" />
          </IconButton>
          <div>
            <Button
              variant="flat"
              href="/share"
              aria-label="Delete"
              className={classes.button}
            >
              <AddIcon className={classes.icon} />
              Share Something
            </Button>
            <MenuComponent />
          </div>
        </AppBar>
      )
    );
  }
}

export default withRouter(withStyles(styles)(NavComponent));
