import axios from 'axios';

const Axios = axios.create({
  baseURL: (() => {
    let protocol = 'https://';
    if (process.env.NODE_ENV === 'development') {
      protocol = 'https://';
      return `http://localhost:8000/api`;
    }
    return `${protocol}${window.location.host}/api`;
  })(),
});

export default (data, needsToken = false) => {
  const token = localStorage.getItem("token");
  
  if (!needsToken || !token) {
    return Axios(data);
  }
  return Axios({
    ...data,
    headers: {
      ...data.headers,
      'Authorization': `Bearer ${token}`,
    }
  });
}