import axios from 'axios';
import { BASE_URL, getQueryParams } from '..';
import { IAddress, ListUser } from '../../types/users';

export interface IGetListUserParam {
  searchKey: string;
}

interface IGetListUserRes {
  list: ListUser;
  status: boolean;
  message?: string;
}

const fetchUsers = (params: IGetListUserParam) => {
  return axios
    .get(
      `${BASE_URL}/api/v1/users?${getQueryParams({
        name_like: params.searchKey,
      })}`
    )
    .then((res) => {
      const resData: IGetListUserRes = {
        list: res.data,
        status: true,
      };
      return resData;
    });
};

interface ICreateUserParam {
  email: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  address: IAddress;
}

interface ICreateUserRes {
  status: boolean;
  message?: string;
}

const createAUser = (params: ICreateUserParam) => {
  return axios.post(`${BASE_URL}/api/v1/users`, params).then((data) => {
    let status = true;
    let message = 'Something went wrong!';
    if (data.request?.status !== 200 && data.request?.status !== 201) {
      status = false;
    }
    if (data.request?.status === 401) {
      message = 'Unauthorized';
    }
    const resData: ICreateUserRes = {
      status,
      message,
    };
    return resData;
  });
};

export { fetchUsers, createAUser };
