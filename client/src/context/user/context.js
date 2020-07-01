import { createContext } from 'react';

export const initialState = {
  users: [],
  currentUser: {},
  selectedUser: {},
  params: {
    listCount: 7,
    currentPage: 0
  },
  totalCount: 0,
  updatedAt: null,
};

const context = createContext();

export default context;