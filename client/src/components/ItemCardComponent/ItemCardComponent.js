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
        className={classes.root}
        src="https://source.unsplash.com/random/800x300"
      />
      <CardHeader
        avatar={<Avatar>R</Avatar>}
        title="User"
        subheader="Uploaded x days ago"
      />
      <CardContent>
        <Typography>{item.title}</Typography>
        <Typography>
          {item.tags.map((tag, index) => `Tags: ${tag.title} `)}
        </Typography>
        <Typography>{item.description}</Typography>
      </CardContent>
      <Button variant="outlined" className={classes.outlined}>
        Borrow
      </Button>
    </Card>
  );
};

export default withStyles(styles)(ItemCardComponent);
