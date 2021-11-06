import React from 'react';
import { Card, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';

import { useDispatch } from 'react-redux';

import { deleteExperience } from '../../../actions/experiences';
import useStyles from './styles';

const Experience = ({ experience }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} gutterTop variant="h6" component="h2">{experience.title}</Typography>
        <div className={classes.details}>
          <Typography variant="body1" color="textSecondary" component="p">{experience.description.split(' ').splice(0, 20).join(' ')}...</Typography>
        </div>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">{experience.tags.map((tag) => `#${tag} `)}</Typography>
        </div>
      </CardContent>
      <CardMedia className={classes.media} image={experience.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={experience.title}>
        <Button size="small" color="secondary" onClick={() => dispatch(deleteExperience(experience._id))}>
          <DeleteIcon fontSize="small" /> &nbsp; Delete
        </Button>
      </CardMedia>
    </Card>
  );
};

export default Experience;
