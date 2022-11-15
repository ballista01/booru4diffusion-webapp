import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type UserInfo from '../types/UserInfo';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { AppDispatch } from '../store';
import { useAppSelector } from '../hooks';

const initialState: UserSigninState = {
  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!) : null,
	loading: false,
	error: false,
	errorMessage: ""
};

export type UserSigninState = {
	userInfo: UserInfo | null
	loading: boolean,
	error: boolean,
	errorMessage: string,
}

const userSigninSlice = createSlice({
  name: 'userSignin',
  initialState,
  reducers: {
    userSigninRequest: (state) => {
      state.loading = true;
    },
    userSigninSuccess: (state, action: PayloadAction<UserInfo>) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.error = false;
    },
    userSigninFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
			state.error = true;
      state.errorMessage = action.payload;
    },
    userSignOut: (state) => {
      state.userInfo = null;
    },
  },
});

export const {
  userSigninFail, userSigninRequest, userSigninSuccess, userSignOut,
} = userSigninSlice.actions;

export const selectUserSignin = (state: RootState) => state.userSignin;

export const signin = (username: string, password: string) => async (dispatch: AppDispatch) => {
  dispatch(userSigninRequest());
  try {
    const { data } = await axios.post('/api/auth/signin', { username, password });
    dispatch(userSigninSuccess(data));
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (err: any) {
    dispatch(userSigninFail(err.response ? err.response.data.message : err.message));
  }
};
export const signOut = () => (dispatch: AppDispatch) => {
  localStorage.removeItem('userInfo');
  dispatch(userSignOut());
};

export default userSigninSlice.reducer;