import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import ShareItemForm from '../../components/ShareItemForm';
import styles from './styles';
import { Grid } from '@material-ui/core';
import ItemCardComponent from '../../components/ItemCardComponent';

const Share = ({ classes, data }) => {
  return (
    <Grid container className={classes.shareContainer} spacing={24}>
      <Grid className={classes.gridItems} item xs={4}>
        <ItemCardComponent />
      </Grid>

      <Grid className={classes.gridItems} item xs={4}>
        <ShareItemForm className={classes.shareItemForm} data={data} />
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Share);
