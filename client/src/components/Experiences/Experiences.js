import React from 'react';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Experience from './Experience/Experience';
import useStyles from './styles';

const Experiences = ({ setCurrentId }) => {
  const experiences = useSelector((state) => state.experiences);
  const classes = useStyles();
  if (!experiences?.length) return 'No experience yet!';

  return (
    <Grid className={classes.container} container alignItems="stretch" spacing={3}>
      {experiences?.map((experience) => (
        <Grid key={experience._id} item xs={12} sm={12} md={6} lg={3}>
          <Experience experience={experience} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};
export default Experiences;
