import { withStyles } from '@material-ui/core/styles';
import React from 'react';

import styles from './styles';
import ItemCardComponent from '../../components/ItemCardComponent';
import { Grid } from '@material-ui/core';

const Items = ({ classes, data }) => {
  return (
    <Grid className={classes.grid} container spacing={24}>
      {data.items.map((itemData, index) => {
        return (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <ItemCardComponent item={itemData} key={index} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default withStyles(styles)(Items);
