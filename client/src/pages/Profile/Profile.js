import { Grid, Card, CardContent, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import styles from './styles';
import ItemCardComponent from '../../components/ItemCardComponent';

const Profile = ({ classes, data }) => {
  return (
    <div className={classes.profilePage}>
      <Grid container>
        <Grid item xs={12} className={classes.profileCard}>
          <Card>
            <CardContent>
              <Typography variant="h1" component="h1">
                {data.user.fullname}
              </Typography>
              <Typography variant="h2" component="h2">
                {`${data.user.items.length} Items shared ${
                  data.user.borrowed.length
                } Items borrowed`}
              </Typography>
              <Typography variant="h3" component="h3">
                {data.user.bio}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Typography variant="h1" component="h1" color="primary">
          Shared Items
        </Typography>
        <Grid item xs={12} className={classes.borrowedItems}>
          {data.user.items.map((item, index) => {
            return (
              <Grid item xs={4} className={classes.borrowedItem}>
                <ItemCardComponent key={index} item={item} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Profile);
