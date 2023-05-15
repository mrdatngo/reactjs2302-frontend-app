import axios from 'axios';
import { clearToken, clearUserInfo, getToken } from '../helpers/storage';

const BASE_URL = 'https://mock-server-api-one.vercel.app';

axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

axios.interceptors.response.use(undefined, (err) => {
  console.log(err.response);
  if (
    err.response &&
    err.response.status === 401 &&
    err.config?.url?.includes('account/detail')
  ) {
    clearUserInfo();
    clearToken();
    window.location.href = '/login';
  }
  return err;
});

export const getQueryParams = (params: any): string => {
  const searchParams = new URLSearchParams();
  Object.keys(params).forEach((key) => {
    params[key] && searchParams.append(key, params[key]);
  });
  return searchParams.toString();
};

export { BASE_URL };
