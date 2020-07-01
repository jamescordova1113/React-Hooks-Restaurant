import React, { useReducer, useContext } from 'react';
import Context, { initialState } from './context';
import reducer from './reducer';
import {
  getPlans,
  editPlan,
  createPlan,
  deletePlan,
  getSelectedPlan,
  getFuturePlans,
  editCurrentPage,
} from './actions';

const PlanContextProvider = ({
  children,
  initialContext = initialState,
}) => {
  const [state, dispatch] = useReducer(reducer, initialContext);
  
  return (
    <Context.Provider
      value={{
        data: state,
        methods: {
          getPlans: getPlans(dispatch),
          editPlan: editPlan(dispatch),
          createPlan: createPlan(dispatch),
          deletePlan: deletePlan(dispatch),
          getSelectedPlan: getSelectedPlan(dispatch),
          getFuturePlans: getFuturePlans(dispatch),
          editCurrentPage: editCurrentPage(dispatch),
        }
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const usePlan = () => useContext(Context);

export default PlanContextProvider;