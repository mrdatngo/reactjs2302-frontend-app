import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface CounterState {
  value: number;
  status: string;
}

const initialState: CounterState = {
  value: 0,
  status: '',
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'success';
        state.value += action.payload.count;
      })
      .addCase(incrementAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async () => {
    const count: number = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(1);
      }, 1000);
    });
    return { count };
  }
);

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
