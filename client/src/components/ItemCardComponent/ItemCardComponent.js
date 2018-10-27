import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  withStyles
} from '@material-ui/core';

import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles';

const ItemCardComponent = ({ classes, item }) => {
  return (
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
        avatar={<Avatar>R</Avatar>}
        title={`${item.owner.fullname}`}
        subheader={`Created on: ${item.createdon}`}
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
  );
};

// ItemCardComponent.defaultProps = {
//   item: {
//     title: 'Default item',
//     description: 'Default description',
//     createdon: 'Default date',
//     imgURL: '',
//     owner: {
//       fullname: 'Default Name'
//     },
//     tags: [{ title: 'Default Tag' }]
//   }
// };

export default withStyles(styles)(ItemCardComponent);

ItemCardComponent.propTypes = {
  item: PropTypes.object,
  classes: PropTypes.object
};
