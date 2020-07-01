import { toast } from 'react-toastify';
import * as API from './api';

export const GET_PLANS_SUCCESS = 'GET_PLANS_SUCCESS';
export const GET_PLANS_FAILURE = 'GET_PLANS_FAILURE';
export const CREATE_PLAN_SUCCESS = 'CREATE_PLAN_SUCCESS';
export const CREATE_PLAN_FAILURE = 'CREATE_PLAN_FAILURE';
export const EDIT_PLAN_SUCCESS = 'EDIT_PLAN_SUCCESS';
export const EDIT_PLAN_FAILURE = 'EDIT_PLAN_FAILURE';
export const DELETE_PLAN_SUCCESS = 'DELETE_PLAN_SUCCESS';
export const GET_SELECTED_PLAN_SUCCESS = 'GET_SELECTED_PLAN_SUCCESS'; 
export const GET_FUTURE_PLANS_SUCCESS = 'GET_FUTURE_PLANS_SUCCESS';
export const EDIT_CURRENT_PAGE_SUCCESS = 'EDIT_CURRENT_PAGE_SUCCESS';

export const getPlans = dispatch => async (userId, params) => {
  try {
    const data = await API.getPlans(userId, params);
    dispatch({
      type: GET_PLANS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PLANS_FAILURE
    });
  }
}

export const getFuturePlans = dispatch => async (userId) => {
  try {
    const data = await API.getFuturePlans(userId);
    dispatch({
      type: GET_FUTURE_PLANS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    
  }
}

export const createPlan = dispatch => async (data) => {
  try {
    await API.createPlan(data);
    toast.success("Plan Create Success!");
    dispatch({
      type: CREATE_PLAN_SUCCESS,
      payload: data,
    });
    
  } catch (error) {
    toast.error("Plan Create Failure!");
    dispatch({
      type: CREATE_PLAN_FAILURE,
    });
  }
}

export const editPlan = dispatch => async (id, data, success) => {
  try {
    await API.editPlan(id, data);
    toast.success("Plan Update Success!");
    success();
  } catch (error) {
    toast.error("Plan Update Failure!");
  }
}

export const deletePlan = dispatch => async (data) => {
  try {
    toast.success("Plan Delete Success");
    const response = await API.deletePlan(data);
    dispatch({
      type: DELETE_PLAN_SUCCESS,
      payload: response.data.plan
    })
  } catch(error) {
    if (error.email) {
      toast.error(error.email[0]);
    } else {
      toast.error("Plan Delete Failed");
    }
  }
}

export const getSelectedPlan = dispatch => async (data) => {
  try {
    dispatch({
      type: GET_SELECTED_PLAN_SUCCESS,
      payload: data
    })
  } catch {

  }
}

export const editCurrentPage = dispatch => (data) => {
  try {
    dispatch({
      type: EDIT_CURRENT_PAGE_SUCCESS,
      payload: data,
    })
  } catch {

  }
}