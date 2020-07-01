import React, { useReducer, useContext, useEffect } from 'react';
import Context, { initialState } from './context';
import reducer from './reducer';
import {
  getCurrentUser,
  setCurrentUser,
  getUsers,
  addUser,
  getSelectedUser,
  updateUser,
  removeUser,
  login,
  signUp,
  signOut,
  isManager,
  isAdmin,
  isLoggedIn,
  resetStore,
  updateProfile,
} from './actions';

const UserContextProvider = ({
  children,
  initialContext = initialState,
}) => {
  const [state, dispatch] = useReducer(reducer, initialContext);

  useEffect(() => {
    const userData = localStorage.getItem("appUser", state);

    if(state.updatedAt) {
        localStorage.setItem("appUser", JSON.stringify(state));
    } else if(userData) {
        resetStore(dispatch)(JSON.parse(userData));
    }
  }, [state.updatedAt]);
  
  return (
    <Context.Provider
      value={{
        data: state,
        methods: {
          getCurrentUser: getCurrentUser(dispatch),
          setCurrentUser: setCurrentUser(dispatch),
          addUser: addUser(dispatch),
          getUsers: getUsers(dispatch),
          getSelectedUser: getSelectedUser(dispatch),
          updateUser: updateUser(dispatch),
          updateProfile: updateProfile(dispatch),
          removeUser: removeUser(dispatch),
          login: login(dispatch),
          signOut: signOut(dispatch),
          signUp: signUp(dispatch),
          isLoggedIn: isLoggedIn(state),
          isAdmin: isAdmin(state),
          isManager: isManager(state)
        },
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useUser = () => useContext(Context);

export default UserContextProvider;