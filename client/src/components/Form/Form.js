import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';
// import ChipInput from 'material-ui-chip-input';

import { createExperience, updateExperience } from '../../actions/experiences';
import useStyles from './styles';

const Form = ({ currentId, setCurrentId }) => {
  const [experienceData, setExperienceData] = useState({
    title: '',
    name: '',
    color: '',
    sugar: '',
    bottle: '',
    winery: '',
    graps: '',
    description: '',
    wine: '',
    user: '',
    tags: '',
    selectedFile: '',
  });
  // const [experienceData, setExperienceData] = useState({ title: '', description: '', wine: '', tags: '', selectedFile: '' });
  const experience = useSelector((state) => (currentId ? state.experiences.find((id) => id._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  const clear = () => {
    setCurrentId(0);
    // setExperienceData({ title: '', description: '', wine: '', tags: '', selectedFile: '' });
    setExperienceData({
      name: '',
      color: '',
      sugar: '',
      title: '',
      bottle: '',
      winery: '',
      graps: '',
      description: '',
      wine: '',
      user: '',
      tags: '',
      selectedFile: '',
    });
  };

  useEffect(() => {
    if (!experience?.title) clear();
    if (experience) setExperienceData(experience);
  }, [experience]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      // dispatch(createExperience({ ...experienceData, name: user?.result?.name }, history));
      dispatch(createExperience({ ...experienceData, user: user?.result?.name }, history));
      clear();
    } else {
      dispatch(updateExperience(currentId, { ...experienceData, user: user?.result?.name }));
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like others memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${experience.title}"` : 'Creating a Memory'}</Typography>
        <TextField name="name" variant="outlined" label="Name" fullWidth value={experienceData.name} onChange={(e) => setExperienceData({ ...experienceData, name: e.target.value })} />
        <TextField name="winery" variant="outlined" label="Winery" fullWidth value={experienceData.winery} onChange={(e) => setExperienceData({ ...experienceData, winery: e.target.value })} />
        <TextField name="color" variant="outlined" label="color" fullWidth value={experienceData.color} onChange={(e) => setExperienceData({ ...experienceData, color: e.target.value })} />

        <TextField name="sugar" variant="outlined" label="Sugar" fullWidth value={experienceData.sugar} onChange={(e) => setExperienceData({ ...experienceData, sugar: e.target.value })} />
        <TextField name="graps" variant="outlined" label="Graps" fullWidth value={experienceData.graps} onChange={(e) => setExperienceData({ ...experienceData, graps: e.target.value })} />

        <TextField name="description" variant="outlined" label="Description" fullWidth value={experienceData.description} onChange={(e) => setExperienceData({ ...experienceData, description: e.target.value })} />

        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={experienceData.tags} onChange={(e) => setExperienceData({ ...experienceData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setExperienceData({ ...experienceData, selectedFile: base64 })} /></div>

        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
