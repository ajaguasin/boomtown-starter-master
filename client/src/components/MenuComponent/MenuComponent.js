import React, { Component } from 'react';

import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import styles from './styles';
import { withStyles } from '@material-ui/core';

const options = [
  { title: 'Your Profile', path: '/profile' },
  { title: 'Sign Out', path: '/welcome' }
];

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
          {options.map((option, index) => (
            <MenuItem key={index} onClick={this.handleClose}>
              <Link to={option.path} className={this.props.classes.menuItem}>
                {option.title}
              </Link>
            </MenuItem>
          ))}
        </Menu>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(MenuComponent);
