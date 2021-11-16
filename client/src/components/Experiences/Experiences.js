import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Experience from './Experience/Experience';
import useStyles from './styles';

const Experiences = ({ setCurrentId }) => {
  const { experiences } = useSelector((state) => state.experiences);
  const classes = useStyles();

  // if ((!experiences?.length) && (!isLoading)) return 'No experience yet!';

  return (
    !experiences.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {experiences?.map((experience) => (
          <Grid key={experience._id} item xs={12} sm={12} md={6} lg={6}>
            <Experience experience={experience} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};
export default Experiences;
