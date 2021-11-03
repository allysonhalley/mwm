import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import { createExperience, updateExperience } from '../../actions/experiences';
import useStyles from './styles';

const Form = ({ currentId, setCurrentId }) => {
  // const [experienceData, setExperienceData] = useState({
  //   name: '',
  //   color: '',
  //   sugar: '',
  //   winery: '',
  //   description: '',
  //   tags: '',
  //   selectedFile: '',
  // });

  const [experienceData, setExperienceData] = useState({ title: '', description: '', wine: '', tags: '', selectedFile: '' });
  const experience = useSelector((state) => (currentId ? state.experiences.find((description) => description._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (experience) setExperienceData(experience);
  }, [experience]);

  const clear = () => {
    setCurrentId(0);
    setExperienceData({ title: '', description: '', wine: '', tags: '', selectedFile: '' });
    // setExperienceData({
    //   name: '',
    //   color: '',
    //   sugar: '',
    //   winery: '',
    //   description: '',
    //   tags: '',
    //   selectedFile: '',
    // });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createExperience(...experienceData));
      clear();
    } else {
      dispatch(updateExperience(currentId, ...experienceData));
      clear();
    }
  };

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${experience.title}"` : 'Creating a Memory'}</Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={experienceData.title} onChange={(e) => setExperienceData({ ...experienceData, title: e.target.value })} />
        <TextField name="description" variant="outlined" label="Description" fullWidth multiline rows={4} value={experienceData.description} onChange={(e) => setExperienceData({ ...experienceData, description: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={experienceData.tags} onChange={(e) => setExperienceData({ ...experienceData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setExperienceData({ ...experienceData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
