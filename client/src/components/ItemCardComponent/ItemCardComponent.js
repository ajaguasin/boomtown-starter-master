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
import React from 'react';
import styles from './styles';

const ItemCardComponent = ({ classes, item }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        className={classes.cardMedia}
        src="https://source.unsplash.com/random/800x300"
      />
      <CardHeader
        avatar={<Avatar>R</Avatar>}
        title={`${item.ownerid.fullname}`}
        subheader={`Created on: ${item.createdon}`}
      />
      <CardContent>
        <Typography>
          <h1>{item.title}</h1>
        </Typography>
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

export default withStyles(styles)(ItemCardComponent);
