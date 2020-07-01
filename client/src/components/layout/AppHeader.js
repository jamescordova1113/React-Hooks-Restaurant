import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useUser } from '../../context/user';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
  }
}));

export default function ButtonAppBar() {
  const { methods: { signOut , isLoggedIn, isManager, isAdmin } } = useUser();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Travel Plan
          </Typography>
          {isLoggedIn() ? 
            <>
              <NavLink className={classes.navLink} to='/plans'>
                <Button color="inherit">Plans</Button>
              </NavLink>
              <NavLink className={classes.navLink} to='/travellist'>
                <Button color="inherit">Travel List</Button>
              </NavLink>
              <NavLink className={classes.navLink} to='/updateprofile'>
                <Button color="inherit">Update Profile</Button>
              </NavLink>
              {isManager() || isAdmin() ?
                <NavLink className={classes.navLink} to='/user'>
                  <Button color="inherit">Users</Button>
                </NavLink> : null}
              <NavLink className={classes.navLink} to='/login'>
                <Button onClick={signOut} color="inherit">Log Out</Button>
              </NavLink>
            </> :
            <>
              <NavLink className={classes.navLink} to='/login'>
                <Button color="inherit">Login</Button>
              </NavLink>
              <NavLink className={classes.navLink} to='/signup'>
                <Button color="inherit">SignUp</Button>
              </NavLink>
            </> }
        </Toolbar>
      </AppBar>
    </div>
  );
}