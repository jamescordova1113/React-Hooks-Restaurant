import React, { useEffect } from 'react';
import _ from 'lodash';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm, Controller } from 'react-hook-form';
import { usePlan } from '../../context/plan';
import * as yup from 'yup';
import { history } from '../..';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: 'red'
  }
}));

const UpdateUserPlan = () => {
  const classes = useStyles();
  const { methods: { editPlan } } = usePlan();
  const { data: { selectedPlan }} = usePlan();

  useEffect(()=>{
    _.forIn(selectedPlan, function (info, key) {
      setValue(key, info);
    })
  }, []);

  let validationUpdatePlan = yup.object().shape({
    destination: yup.string().required("Destination is required"),
    comment: yup.string().required("Comment is required"),
  });

  let defaultValues = {
    destination: '',
    comment: ''
  }

  const { handleSubmit, control, errors, setValue } = useForm({
    validationSchema: validationUpdatePlan,
    defaultValues
  });

  const submit = (values) => {
    editPlan(selectedPlan._id, values, () => {
      history.push('/usertravellist');
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Update User Plan
        </Typography>
        <form onSubmit={handleSubmit(submit)} className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Controller
                name="destination"
                id="destination"
                control={control}
                as={
                  <TextField
                    type="text"
                    variant="outlined"
                    label="Destination"
                    fullWidth
                  />
                }>
              </Controller>
              <p className={classes.error}>{errors.destination && errors.destination.message}</p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="startDate"
                id="startDate"
                control={control}
                as={
                  <TextField
                    type="date"
                    variant="outlined"
                    label="Start Date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                  />
                }>
                </Controller>
                <p className={classes.error}>{errors.startDate && errors.startDate.message}</p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="endDate"
                id="endDate"
                control={control}
                as={
                  <TextField
                    type="date"
                    variant="outlined"
                    label="End Date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                  />
                }>                   
                </Controller>
                <p className={classes.error}>{errors.endDate && errors.endDate.message}</p>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                name="comment"
                id="comment"
                control={control}
                as={
                  <TextField
                    type="text"
                    variant="outlined"
                    label="Comment"
                    fullWidth
                  />
                }>
              </Controller>
              <p className={classes.error}>{errors.comment && errors.comment.message}</p>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Update Plan
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link onClick={() => history.push('/usertravellist')} variant="body2">
                Back to Travel List Page
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default UpdateUserPlan;