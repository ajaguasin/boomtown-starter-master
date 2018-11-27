import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { PropTypes } from 'prop-types';

function LoadingScreen({ classes }) {
  return (
    <div className={classes.container}>
      <CircularProgress className={classes.progress} color="primary" />
    </div>
  );
}

export default withStyles(LoadingScreen);

LoadingScreen.propTypes = {
  classes: PropTypes.shape({
    container: PropTypes.string.isRequired,
    progress: PropTypes.string.isRequired
  })
};
