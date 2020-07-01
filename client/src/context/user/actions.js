import * as API from './api';
import ROLE from '../../utils/constants/role';
import { toast } from 'react-toastify';
import { history } from '../..';

export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const SIGN_OUT = 'SIGN_OUT';
export const RESET_STORE = 'RESET_STORE';
export const SET_CURRENT_USER_SUCCESS = 'SET_CURRENT_USER_SUCCESS';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const GET_SELECTUSER_SUCCESS = 'GET_SELECTUSER_SUCCESS';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const GET_CURRENT_USER_SUCCESS = 'GET_CURRENT_USER_SUCCESS';

export const getCurrentUser = dispatch => async => {
  try {
    dispatch({
      type: GET_CURRENT_USER_SUCCESS
    });
  } catch {

  }
}

export const signUp = dispatch => async data => {
  try {
    await API.signUp(data);
    dispatch({
      type: SIGNUP_SUCCESS
    });
    toast.success("Signup Success!");
    history.push("/login");
  } catch (error) {
    toast.error("Signup Error!");
    dispatch({
      type: SIGNUP_FAILURE
    });
  }
}

export const signOut = dispatch => async => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');

  dispatch({
    type: SIGN_OUT,
  });
  toast.success("Logout Success!");
  history.push("/login");
}

export const login = dispatch => async (data) => {
  dispatch({
    type: LOGIN_REQUEST
  });

  try {
    let result = await API.login(data);
    const { token } = result.data;
    const user = result.data.info;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: result.data,
    });
    
    history.push("/plans");
    toast.success("Login Success!");
  } catch (error) {
    toast.error("Login Failure!");
    dispatch({
      type: LOGIN_FAILURE,
    });
  }
}

export const resetStore = dispatch => async (data) => {
  dispatch({
    type: RESET_STORE,
    payload: data,
  });
}

export const isLoggedIn = state => () => state.currentUser && state.currentUser.token;
export const isAdmin = state => () => state.currentUser && state.currentUser.info.role === ROLE.Admin;
export const isManager = state => () => state.currentUser && state.currentUser.info.role === ROLE.Manager;

export const setCurrentUser = dispatch => async (data) => {
  try {
    dispatch({
      type: SET_CURRENT_USER_SUCCESS,
      payload: data,
    });
  } catch {

  }
}

export const addUser = dispatch => async (data) => {
  try {
    await API.addUser(data);
    dispatch({
      type: ADD_USER_SUCCESS,
      payload: data,
    });
    toast.success("User Create Success!");
    history.push("/user");
  } catch {
    toast.error("User Create Failure!");
  }
}

export const getUsers = dispatch => async (params) => {
  try {
    const data = await API.getUsers(params);
    dispatch({
      type: GET_USERS_SUCCESS,
      payload: data
    });
  } catch {

  }
}

export const getSelectedUser = dispatch => async (data) => {
  try {
    dispatch({
      type: GET_SELECTUSER_SUCCESS,
      payload: data
    })
  } catch {

  }
}

export const updateUser = dispatch => async (id, params) => {
  try {
    let { data } = await API.updateUser(id, params);
    toast.success("User Update Success");
    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data,
    })
  } catch {
    toast.error("User Update Failure");
  }
}

export const updateProfile = dispatch => async (id, params) => {
  try {
    let { data } = await API.updateProfile(id, params);
    toast.success("Profile Update Success");
    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data,
    })
  } catch {
    toast.error("Profile Update Failure");
  }
}

export const removeUser = dispatch => async (data) => {
  try {
    toast.success("User Delete Success");
    await API.removeUser(data);
  } catch(error) {
    if (error.email) {
      toast.error(error.email[0]);
    } else {
      toast.error("User Delete Failed");
    }
  }
}