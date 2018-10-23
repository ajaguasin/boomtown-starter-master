import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import ShareItemForm from '../../components/ShareItemForm';
import styles from './styles';
import { Grid } from '@material-ui/core';
import ShareCardComponent from '../../components/ShareCardComponent';

const Share = ({ classes, tags }) => {
  return (
    <Grid container className={classes.shareContainer} spacing={24}>
      <Grid className={classes.gridItems} item xs={4}>
        <ShareCardComponent />
      </Grid>
      <Grid className={classes.gridItems} item xs={4}>
        <ShareItemForm className={classes.shareItemForm} tags={tags} />
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Share);
