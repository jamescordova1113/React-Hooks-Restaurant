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
import { useUser } from '../../context/user';
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

const UpdateProfile = () => {
  const { methods: { updateProfile, getCurrentUser } } = useUser();
  const { data: { currentUser } } = useUser();

  useEffect(()=>{
    _.forIn(currentUser.info, function (info, key) {
      setValue(key, info);
    })
  }, []);

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
  }

  const { handleSubmit, control, errors, setValue } = useForm({
    defaultValues
  });

  const submit = (values) => {
    updateProfile(currentUser.info._id, values);
    getCurrentUser();
    history.push('/plans');
  }

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Update Profile
        </Typography>
        <form onSubmit={handleSubmit(submit)} className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="firstName"
                id="firstName"
                control={control}
                as={
                  <TextField
                    type="text"
                    variant="outlined"
                    label="First Name"
                    fullWidth
                  />
                }>
              </Controller>
              <p className={classes.error}>{errors.firstName && errors.firstName.message}</p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="lastName"
                id="lastName"
                control={control}
                as={
                  <TextField
                    type="text"
                    variant="outlined"
                    label="Last Name"
                    fullWidth
                  />
                }>
              </Controller>
              <p className={classes.error}>{errors.lastName && errors.lastName.message}</p>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="email"
                id="email"
                control={control}
                as={
                  <TextField
                    type="email"
                    variant="outlined"
                    fullWidth
                    label="Email Address"
                  />
                }
              ></Controller>
              <p className={classes.email}>{errors.email && errors.email.message}</p>  
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="password"
                id="password"
                control={control}
                as={
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Password"
                    type="password"
                  />
                }
              ></Controller>
              <p className={classes.password}>{errors.password && errors.password.message}</p>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Update User
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link onClick={() => history.push('/user')} variant="body2">
                Back to User Page
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

export default UpdateProfile;