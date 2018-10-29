import { Card, CardContent, Grid, Typography } from '@material-ui/core';

import ItemCardComponent from '../../components/ItemCardComponent';
import React from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';

const Profile = ({ classes, data }) => {
  return (
    <div className={classes.profilePage}>
      <Grid container>
        <Grid item xs={12} className={classes.profileCard}>
          <Card>
            <CardContent>
              <Typography variant="display1" component="h1">
                {data.user.fullname}
              </Typography>
              <Typography variant="body1" component="h2">
                {`${data.user.items.length} Items shared ${
                  data.user.borrowed.length
                } Items borrowed`}
              </Typography>
              <Typography variant="body1" component="h3">
                {data.user.bio}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Typography variant="display1" component="h1" color="primary">
          Shared Items
        </Typography>
        <Grid item xs={12} className={classes.borrowedItems}>
          {data.user.items.map((item, index) => {
            return (
              <Grid
                item
                xs={12}
                md={6}
                lg={4}
                className={classes.borrowedItem}
                key={index}
              >
                <ItemCardComponent
                  key={index}
                  item={item}
                  className={classes.borrowedItemCard}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Profile);
