import produce from 'immer';

import {
  SET_CURRENT_USER_SUCCESS,
  ADD_USER_SUCCESS,
  GET_USERS_SUCCESS,
  GET_SELECTUSER_SUCCESS,
  UPDATE_USER_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGN_OUT,
  GET_CURRENT_USER_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
} from './actions';

import { initialState } from './context';

export default (
  state = initialState,
  action,
) => {
  const { type, payload } = action;
  
  return produce(state, draft => {
    switch(type) {
      case GET_CURRENT_USER_SUCCESS:
        const info = JSON.parse( localStorage.getItem('user') );
        const token = localStorage.getItem('token');
        draft.currentUser = {info, token};
        break;
      case SET_CURRENT_USER_SUCCESS:
        draft.currentUser = payload;
        break;
      case ADD_USER_SUCCESS:
        break;
      case GET_USERS_SUCCESS:
        draft.users = payload.data.userlist;
        draft.params.listCount = payload.data.listCount;
        draft.params.currentPage = payload.data.currentPage;
        draft.totalCount = payload.data.totalCount;
        break;
      case GET_SELECTUSER_SUCCESS:
        draft.selectedUser = payload;
        break;
      case UPDATE_PROFILE_SUCCESS:
        draft.currentUser.info.firstName = payload.firstName;
        draft.currentUser.info.lastName = payload.lastName;
        draft.currentUser.info.email = payload.email;
        break;
      case UPDATE_USER_SUCCESS:
        break;
      case SIGNUP_SUCCESS:
        draft.currentUser = payload;
        break;
      case SIGNUP_FAILURE:
        draft.currentUser = {};
        break;
      case LOGIN_REQUEST:
        break;
      case LOGIN_SUCCESS:
        draft.currentUser = payload;
        break;
      case LOGIN_FAILURE: 
        break;
      case SIGN_OUT:
        draft.currentUser = {};
        break;
      default:
        break;
    }
  })
};