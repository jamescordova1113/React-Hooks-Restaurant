import React from 'react';
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
import * as yup from 'yup';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const { methods: { login } } = useUser();

  let validationLogin = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is Required")
  });

  const defaultValues = {
    email: '',
    password: '',
  }

  const { handleSubmit, control, errors } = useForm({
    validationSchema: validationLogin,
    defaultValues
  });

  const submit = (values) => {
    login(values);
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
          Sign in
        </Typography>
        <form
          onSubmit={handleSubmit(submit)}
          className={classes.form}
          >
          <Grid container spacing={2}>
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
              }>
              </Controller>
              <p className={classes.error}>{errors.email && errors.email.message}</p>
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
                }>       
              </Controller>
              <p className={classes.error}>{errors.password && errors.password.message}</p>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Login;