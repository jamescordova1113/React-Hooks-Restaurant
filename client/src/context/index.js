import React from 'react';
import UserProvider from './user';
import PlanProvider from './plan';
import { initialState as User } from './user/context';
import { initialState as Plan } from './plan/context';

export const initialState = {
  User,
  Plan
};

const RootContextProvider = ({ children, initialContext = initialState }) => (
  <UserProvider initialContext={initialContext.User}>
    <PlanProvider initialContext={initialContext.Plan}>
      {children}
    </PlanProvider>
  </UserProvider>
);

export default RootContextProvider;