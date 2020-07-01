import produce from 'immer';
import {
  GET_PLANS_SUCCESS,
  CREATE_PLAN_SUCCESS,
  EDIT_PLAN_SUCCESS,
  DELETE_PLAN_SUCCESS,
  GET_SELECTED_PLAN_SUCCESS,
  GET_FUTURE_PLANS_SUCCESS,
  EDIT_CURRENT_PAGE_SUCCESS,
} from './actions';

import { initialState } from './context';

export default (
  state = initialState,
  action = { type: undefined, payload: undefined }
) => {
  const { type, payload } = action;
  return produce(state, draft => {
    switch(type) {
      case EDIT_CURRENT_PAGE_SUCCESS:
        draft.paramsPlan.currentPage = payload;
        break;
      case GET_SELECTED_PLAN_SUCCESS:
        draft.selectedPlan = payload;
        break;
      case GET_FUTURE_PLANS_SUCCESS:
        draft.futurePlans = payload.data.plan;
        break;
      case GET_PLANS_SUCCESS:
        draft.plan = payload.data.plans;
        draft.totalCount = payload.data.totalCount;
        draft.listCount = payload.data.listCount;
        draft.currentPage = payload.data.currentPage;
        break;
      case CREATE_PLAN_SUCCESS:
        draft.plan = draft.plan.concat(payload);
        break;
      case EDIT_PLAN_SUCCESS:
        break;
      case DELETE_PLAN_SUCCESS:
      
        break;
      default:
        break;
    }
  })
}