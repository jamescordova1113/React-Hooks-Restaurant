import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import MainLayout from './components/layout';
import Login from './components/auth/login';
import Signup from './components/auth/signup';
import UsersList from './components/user/userslist';
import UpdateUser from './components/user/updateuser';
import UpdateProfile from './components/user/updateprofile';
import AddUser from './components/user/adduser';
import NextMonthPlans from './components/plan/nextmonthplans';
import TravelList from './components/plan/travellist';
import CreatePlan from './components/plan/createplan';
import UpdatePlan from './components/plan/updateplan';
import UserTravelList from './components/plan/usertravellist';
import CreateUserPlan from './components/plan/createuserplan';
import UpdateUserPlan from './components/plan/updateuserplan';
import { useUser } from './context/user';
import { isAdmin } from './context/user/actions';

const App = () => {
  const { methods: { isLoggedIn, getCurrentUser } } = useUser();

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <MainLayout>
      <ToastContainer autoClose={2000} type={toast.TYPE.INFO} position={toast.POSITION.BOTTOM_RIGHT} />
      <Switch>
        {isLoggedIn() ? 
          <>
            <Route exact path='/user' component={UsersList} />
            <Route exact path='/updateuser' component={UpdateUser} />
            <Route exact path='/updateprofile' component={UpdateProfile} />
            <Route exact path='/adduser' component={AddUser} />
            <Route exact path='/plans' component={NextMonthPlans} />
            <Route exact path='/travellist' component={TravelList} />
            <Route exact path='/createplan' component={CreatePlan} />
            <Route exact path='/updateplan' component={UpdatePlan} />
            {isAdmin() ?
              <>
                <Route exact path='/createuserplan' component={CreateUserPlan} />
                <Route exact path='/updateuserplan' component={UpdateUserPlan} />
                <Route exact path='/usertravellist' component={UserTravelList} />
              </> : null
            }
          </>:
          <>
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />  
          </>
        }
      </Switch>
    </MainLayout> 
  );
}

export default App;