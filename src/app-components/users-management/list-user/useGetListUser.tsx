import { getUsersAction, UsersSelector } from '@/_redux/features/user';
import { useAppDispatch } from '@/_redux/hooks';
import { useEffect, useState } from 'react';
import { fetchUsers } from '../../../apis/users';
import { IUserInfo } from '../../../types/users';

function useGetListUser(): [boolean, IUserInfo[], (searchKey: string) => void] {
  // const [loading, setLoading] = useState<boolean>(false);
  // const [listUser, setListUser] = useState<IUserInfo[]>([]);

  const userSelector = UsersSelector();
  const loading = userSelector.loading;
  const listUser = userSelector.list;

  const dispatch = useAppDispatch();

  const getUsers = (searchKey: string) => {
    // setLoading(true);
    // fetchUsers({
    //   searchKey,
    // })
    //   .then((data) => {
    //     setListUser(data.list);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
    dispatch(getUsersAction({ searchKey }));
  };

  useEffect(() => {
    getUsers('');
  }, []);

  const onSearch = (searchKey: string) => {
    getUsers(searchKey);
  };

  return [loading, listUser, onSearch];
}

export default useGetListUser;
