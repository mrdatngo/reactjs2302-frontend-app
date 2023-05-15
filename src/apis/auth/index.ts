import axios from 'axios';
import { BASE_URL } from '..';
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

export type { ILoginParam, ILoginResponse };

export { login };
