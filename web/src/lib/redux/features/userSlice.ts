import apiCall from '@/helper/axiosInstance';
import { createSlice } from '@reduxjs/toolkit';

type User = {
  email: string;
  password: string;
};

const initialData: User = {
  email: '',
  password: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState: { ...initialData },
  reducers: {
    setSignIn: (_, action) => {
      localStorage.setItem('token', JSON.stringify(action.payload));
      return { ...action.payload };
    },
    setSignOut: () => {
      localStorage.removeItem('token');
      return { ...initialData };
    },
  },
});

const actions = {
  setSignInAction: userSlice.actions.setSignIn,
  setSignOutAction: userSlice.actions.setSignOut,
};

export const { setSignInAction, setSignOutAction } = actions;
