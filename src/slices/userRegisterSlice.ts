
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { userSigninSuccess } from './userSigninSlice';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { AppDispatch } from '../store';
import { useAppSelector } from '../hooks';

const initialState: UserRegisterState = {
	loading: false,
	error: false,
	errorMessage: "",
};

export type UserRegisterState = {
	loading: boolean,
	error: boolean,
	errorMessage: string,
}
const userRegisterSlice = createSlice({
  name: 'userRegister',
  initialState,
  reducers: {
    userRegisterRequest: (state) => {
      state.loading = true;
    },
    userRegisterFail: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
			state.error = true;
      state.loading = false;
    },
    userRegisterSuccess: (state) => {
      state.loading = false;
      state.error = false;
    },
  },
});

// eslint-disable-next-line max-len
export const { userRegisterFail, userRegisterRequest, userRegisterSuccess } = userRegisterSlice.actions;

export const register = (name: string, email: string, password: string) => async (dispatch: AppDispatch) => {
  dispatch(userRegisterRequest());
  try {
    const { data } = await axios.post('/api/auth/signup', { username: name, email, password, role: ['user'] });
    dispatch(userRegisterSuccess());
    dispatch(userSigninSuccess(data));
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (err: any) {
    dispatch(userRegisterFail(err.response ? err.response.data.message : err.message));
  }
};

export const selectUserRegister = (state: RootState) => state.userRegister;

export default userRegisterSlice.reducer;