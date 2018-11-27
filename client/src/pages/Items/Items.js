import { Grid } from '@material-ui/core';
import ItemCardComponent from '../../components/ItemCardComponent';
import React from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import Proptypes from 'prop-types';

const Items = ({ classes, data }) => {
  return (
    <Grid className={classes.grid} container spacing={24}>
      {data.items.map((itemData, index) => {
        return (
          <Grid
            item
            xs={12}
            md={6}
            lg={4}
            key={index}
            className={classes.gridItem}
          >
            <ItemCardComponent
              item={itemData}
              key={index}
              className={classes.itemCard}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default withStyles(styles)(Items);

Items.propTypes = {
  classes: Proptypes.object.isRequired,
  data: Proptypes.object.isRequired
};
