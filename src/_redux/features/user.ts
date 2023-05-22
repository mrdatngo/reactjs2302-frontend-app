import { getAccountInfo } from '@/apis/auth';
import { IAccountInfo } from '@/types/account';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { useAppSelector } from '@/_redux/hooks';
import { ListUser } from '@/types/users';
import { fetchUsers, IGetListUserParam } from '@/apis/users';

export interface UsersState {
  users: {
    loading: boolean;
    list: ListUser;
  };
}

const initialState: UsersState = {
  users: {
    loading: false,
    list: [],
  },
};

export const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAction.pending, (state) => {
        state.users.loading = true;
      })
      .addCase(getUsersAction.fulfilled, (state, action) => {
        state.users.loading = false;
        state.users.list = action.payload.list;
      })
      .addCase(getUsersAction.rejected, (state) => {
        state.users.loading = false;
        state.users.list = [];
      });
  },
});

export const getUsersAction = createAsyncThunk(
  'user/fetchUsers',
  async (params: IGetListUserParam) => {
    return await fetchUsers(params);
  }
);

export const UsersSelector = () => useAppSelector((state) => state.user.users);

export default usersSlice.reducer;
