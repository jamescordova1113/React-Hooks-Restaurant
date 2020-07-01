import { createContext } from 'react';

export const initialState = {
  plan: [],
  totalCount: 0,
  selectedPlan: {},
  futurePlans: [],
  paramsPlan: {
    listCount: 10,
    currentPage: 0
  },
};

const context = createContext();

export default context;