import Login from './components/auth/login';
import Signup from './components/auth/signup';
import UsersList from './components/user/userslist';
import AddUser from './components/user/adduser';
import UpdateUser from './components/user/updateuser';
import TravelList from './components/plan/travellist';
import NextMonthPlans from './components/plan/nextmonthplans';
import CreatePlan from './components/plan/createplan';
import UpdateProfile from './components/user/updateprofile';
import UpdatePlan from './components/plan/updateplan';
import UserTravelList from './components/plan/usertravellist';
import CreateUserPlan from './components/plan/createuserplan';

export const Routes = [
  {
    path: '/login',
    exact: true,
    component: Login,
  },
  {
    path: '/signup',
    exact: true,
    component: Signup,
  },
  {
    path: '/adduser',
    exact: true,
    component: AddUser,
  },
  {
    path: '/updateuser',
    exact: true,
    component: UpdateUser,
  },
  {
    path: '/updateprofile',
    exact: true,
    component: UpdateProfile,
  },
  {
    path: '/user',
    exact: true,
    component: UsersList,
  },
  {
    path: '/plans',
    exact: true,
    component: NextMonthPlans,
  },
  {
    path: '/travellist',
    exact: true,
    component: TravelList,
  },
  {
    path: '/createplan',
    exact: true,
    component: CreatePlan,
  },
  {
    path: '/createuserplan',
    exact: true,
    component: CreateUserPlan,
  },
  {
    path: '/updateuserplan',
    exact: true,
    component: UpdateUserPlan,
  },
  {
    path: '/updateplan',
    exact: true,
    component: UpdatePlan,
  },
  {
    path: '/usertravellist',
    exact: true,
    component: UserTravelList,
  }
];