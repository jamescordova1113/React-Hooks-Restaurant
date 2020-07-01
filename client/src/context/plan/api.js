import Axios from '../../utils/axios';

export const getPlans = async (pageParams, filterParams) => {
  return Axios({
    method: 'GET',
    url: '/plan/',
    params: {...pageParams, ...filterParams}
  }, true);
}

export const getFuturePlans = async (data) => {
  return Axios({
    method: 'GET',
    url: '/plan/future',
    params: data,
  }, true);
}

export const createPlan = async (data) =>
  Axios({
    method: 'POST',
    url: '/plan/',
    data
  }, true);

export const deletePlan = async (id) => 
  Axios({
    method: 'DELETE',
    url: `/plan/${id}`
  }, true);

export const editPlan = async (id, data) =>
  Axios({
    method: 'PUT',
    url: `/plan/${id}`,
    data
  }, true);
