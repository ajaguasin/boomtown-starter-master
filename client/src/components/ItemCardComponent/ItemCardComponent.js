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
      {console.log(item)}
      <CardMedia
        component="img"
        className={classes.cardMedia}
        src={item ? 'https://source.unsplash.com/random/800x300' : item.imgURL}
      />
      <CardHeader
        avatar={<Avatar>R</Avatar>}
        title={item ? `${item.owner.fullname}` : item.name}
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

ItemCardComponent.defaultProps = {
  item: {
    title: 'Default item',
    description: 'Default description',
    createdon: 'Default date',
    imgURL: '',
    owner: {
      fullname: 'Default Name'
    },
    tags: [{ title: 'Default Tag' }]
  }
};

export default withStyles(styles)(ItemCardComponent);
