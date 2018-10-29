import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  withStyles
} from '@material-ui/core';

import Gravatar from 'react-gravatar';
import PropTypes from 'prop-types';
import React from 'react';
import { ViewerContext } from '../../context/ViewerProvider';
import moment from 'moment';
import styles from './styles';

const ItemCardComponent = ({ classes, item }) => {
  return (
    <ViewerContext.Consumer>
      {({ viewer, loading }) => (
        <Card>
          <CardMedia
            component="img"
            className={classes.cardMedia}
            src={
              item.imageurl
                ? item.imageurl
                : 'https://source.unsplash.com/random/800x300'
            }
          />

          <CardHeader
            avatar={
              <Gravatar
                className={classes.avatar}
                email={item.owner.email || viewer.email}
              />
            }
            title={item.owner.fullname ? item.owner.fullname : viewer.fullname}
            subheader={moment(item.createdon).fromNow()}
          />

          <CardContent>
            <Typography>{item.title}</Typography>
            <Typography>
              {item.tags.map((tag, index) => `Tags: ${tag.title} `)}
            </Typography>
            <Typography>{item.description}</Typography>
          </CardContent>
          <Button variant="outlined" className={classes.button}>
            Borrow
          </Button>
        </Card>
      )}
    </ViewerContext.Consumer>
  );
};

export default withStyles(styles)(ItemCardComponent);

ItemCardComponent.propTypes = {
  item: PropTypes.object,
  classes: PropTypes.object
};
