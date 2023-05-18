import axios from 'axios';
import { BASE_URL } from '..';
import { IAccountInfo } from '@/types/account';
interface ILoginParam {
  username: string;
  password: string;
}

interface ILoginResponse {
  username: string;
  token: string;
}

const login = (params: ILoginParam) => {
  return axios.post(`${BASE_URL}/api/v1/login`, params).then((res) => {
    const loginRes: ILoginResponse = {
      username: res.data.username,
      token: res.data.token,
    };
    return loginRes;
  });
};

const getAccountInfo = () => {
  return axios.get(`${BASE_URL}/api/v1/account/detail`).then((res) => {
    const accountInfo = res.data as IAccountInfo;
    return accountInfo;
  });
};

export type { ILoginParam, ILoginResponse };

export { login, getAccountInfo };
