import { LOGOUT_MUTATION, VIEWER_QUERY } from '../../apollo/queries';
import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import { PropTypes } from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import styles from './styles';
import { withStyles } from '@material-ui/core';

const ITEM_HEIGHT = 48;

class MenuComponent extends Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const logoutMutation = this.props.logoutMutation;
    return (
      <React.Fragment>
        <IconButton
          aria-label="More"
          aria-owns={open ? 'long-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>

        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200
            }
          }}
        >
          <MenuItem onClick={this.handleClose}>
            <Link to={'/profile'} className={this.props.classes.menuItem}>
              Your Profile
            </Link>
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
            <Link
              to={'/welcome'}
              className={this.props.classes.menuItem}
              onClick={() => {
                logoutMutation();
              }}
            >
              SignOut
            </Link>
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
}

const refetchQueries = [
  {
    query: VIEWER_QUERY
  }
];

export default compose(
  graphql(LOGOUT_MUTATION, {
    options: {
      refetchQueries
    },
    name: 'logoutMutation'
  }),

  withStyles(styles)
)(MenuComponent);

MenuComponent.propTypes = {
  classes: PropTypes.shape({
    menuItem: PropTypes.string.isRequired
  }),
  logoutMutation: PropTypes.func.isRequired
};
