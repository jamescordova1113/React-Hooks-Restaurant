import Axios from '../../utils/axios';

export const login = async data => Axios({
  method: 'POST',
  url: '/login/',
  data,
});

export const signUp = async data => Axios({
  method: 'POST',
  url: '/signup/',
  data,
});

export const getUsers = async (params) => {
  return Axios({
    method: 'GET',
    url: '/user/',
    params,
  }, true);
};

export const addUser = async(data) => Axios({
  method: 'POST',
  url: '/user/',
  data,
}, true);

export const removeUser = async id => Axios({
  method: 'DELETE',
  url: `/user/${id}`,
  data: { id },
}, true);

export const updateUser = async (id, data) => Axios({
  method: 'PUT',
  url: `/user/${id}/`,
  data,
}, true);

export const updateProfile = async (id, data) => Axios({
  method: 'PUT',
  url: `/user/${id}/`,
  data,
}, true);
