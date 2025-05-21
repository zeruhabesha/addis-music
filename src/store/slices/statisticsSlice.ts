import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Statistics } from '../../types';

interface StatisticsState {
  data: Statistics | null;
  loading: boolean;
  error: string | null;
}

const initialState: StatisticsState = {
  data: null,
  loading: false,
  error: null,
};

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    fetchStatisticsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchStatisticsSuccess: (state, action: PayloadAction<Statistics>) => {
      state.data = action.payload;
      state.loading = false;
    },
    fetchStatisticsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchStatisticsRequest,
  fetchStatisticsSuccess,
  fetchStatisticsFailure,
} = statisticsSlice.actions;

export default statisticsSlice.reducer;