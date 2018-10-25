import React from 'react';
import styles from './styles';
import ItemCardComponent from '../ItemCardComponent/ItemCardComponent';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';

const ShareItemPreview = ({ shareItemPreview }) => {
  return <ItemCardComponent item={shareItemPreview} />;
};

const mapStateToProps = state => ({
  shareItemPreview: state.shareItemPreview
});

export default connect(mapStateToProps)(withStyles(styles)(ShareItemPreview));
