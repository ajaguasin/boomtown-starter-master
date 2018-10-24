import React from 'react';
import styles from './styles';
import ItemCardComponent from '../ItemCardComponent/ItemCardComponent';
import { withStyles } from '@material-ui/core';

const ShareItemPreview = ({ classes }) => {
  return <ItemCardComponent />;
};

export default withStyles(styles)(ShareItemPreview);
