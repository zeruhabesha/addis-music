import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  sidebarOpen: boolean;
  notification: {
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
  };
}

const initialState: UiState = {
  sidebarOpen: false,
  notification: {
    show: false,
    message: '',
    type: 'info',
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    showNotification: (state, action: PayloadAction<{ message: string; type: 'success' | 'error' | 'info' }>) => {
      state.notification = {
        show: true,
        message: action.payload.message,
        type: action.payload.type,
      };
    },
    hideNotification: (state) => {
      state.notification.show = false;
    },
  },
});

export const {
  toggleSidebar,
  showNotification,
  hideNotification,
} = uiSlice.actions;

export default uiSlice.reducer;