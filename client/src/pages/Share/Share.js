import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import ShareItemForm from '../../components/ShareItemForm';
import styles from './styles';
import { Grid } from '@material-ui/core';
import ItemCardComponent from '../../components/ItemCardComponent';

const Share = ({ classes }) => {
  return (
    <Grid container>
      <Grid item lg={4}>
        <ItemCardComponent />
      </Grid>

      <Grid item lg={4}>
        <ShareItemForm />
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Share);
