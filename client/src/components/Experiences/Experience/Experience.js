import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { deleteExperience } from '../../../actions/experiences';
import useStyles from './styles';

const Experience = ({ experience, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={experience.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={experience.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{experience.title}</Typography>
        <Typography variant="body2">{moment(experience.createdAt).fromNow()}</Typography>
      </div>
      {(user?.result?.googleId === experience?.user || user?.result?._id === experience?.user) && (
      <div className={classes.overlay2} name="edit">
        <Button onClick={() => setCurrentId(experience._id)} style={{ color: 'white' }} size="small">
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      )}
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{experience.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{experience.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{experience.descriptionsplit(' ').splice(0, 20).join(' ')}...</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        {(user?.result?.googleId === experience?.user || user?.result?._id === experience?.user) && (
        <Button size="small" color="secondary" onClick={() => dispatch(deleteExperience(experience._id))}>
          <DeleteIcon fontSize="small" /> &nbsp; Delete
        </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Experience;
