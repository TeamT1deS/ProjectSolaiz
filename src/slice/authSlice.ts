// src/slice/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  isAdmin: boolean;
  userName: string;
  showAlert: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
  isAdmin: false,
  userName: '',
  showAlert: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ isAdmin: boolean, userName: string }>) {
      state.isLoggedIn = true;
      state.isAdmin = action.payload.isAdmin;
      state.userName = action.payload.userName;
      state.showAlert = true;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.isAdmin = false;
      state.userName = '';
      state.showAlert = false;
    },
    hideAlert(state) {
      state.showAlert = false;
    }
  },
});

export const { login, logout, hideAlert } = authSlice.actions;
export default authSlice.reducer;