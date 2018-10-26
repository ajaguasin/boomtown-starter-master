import { withRouter, Link } from 'react-router-dom';
import { AppBar, Button, IconButton, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddCircle';
import MenuComponent from '../MenuComponent';
import React, { Component } from 'react';
import styles from './styles';
import BoomtownLogo from '../../images/boomtown.svg';

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
              // color="primary"
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
