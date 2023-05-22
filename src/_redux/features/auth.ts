import { getAccountInfo } from '@/apis/auth';
import { IAccountInfo } from '@/types/account';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { useAppSelector } from '@/_redux/hooks';

export interface AuthState {
  account: {
    loading: boolean;
    accountData: IAccountInfo | undefined;
  };
}

const initialState: AuthState = {
  account: {
    loading: false,
    accountData: undefined,
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAccountInfoAction.pending, (state) => {
        state.account.loading = true;
      })
      .addCase(getAccountInfoAction.fulfilled, (state, action) => {
        state.account.loading = false;
        state.account.accountData = action.payload;
      })
      .addCase(getAccountInfoAction.rejected, (state) => {
        state.account.loading = false;
        state.account.accountData = undefined;
      });
  },
});

export const getAccountInfoAction = createAsyncThunk(
  'auth/fetchAccount',
  async () => {
    return await getAccountInfo();
  }
);

export const AccountSelector = () =>
  useAppSelector((state) => state.auth.account);

export default authSlice.reducer;
