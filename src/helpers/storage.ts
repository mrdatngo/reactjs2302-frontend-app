import { IAccountInfo } from '../types/account';

const TOKEN_KEY = 'token';
const USER_INFO_KEY = 'user';

const saveToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

const saveUserInfo = (userInfo: IAccountInfo) => {
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
};

const getUserInfo = () => {
  const userStr = localStorage.getItem(USER_INFO_KEY);
  if (typeof userStr === 'string') {
    return JSON.parse(userStr);
  }
  return null;
};

const clearUserInfo = () => {
  localStorage.removeItem(USER_INFO_KEY);
};

const IsLoggedIn = (): boolean => {
  const token = getToken();
  return token != '' && token != null;
};

export {
  saveToken,
  getToken,
  clearToken,
  saveUserInfo,
  getUserInfo,
  clearUserInfo,
  IsLoggedIn,
};
