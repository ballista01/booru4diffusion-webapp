import { configureStore } from '@reduxjs/toolkit';
import imageListReducer from './slices/imageListSlice';
import imageDetailReducer from './slices/imageDetailSlice';
import cartReducer from './slices/cartSlice';
import userSigninReducer from './slices/userSigninSlice';
import userRegisterReducer from './slices/userRegisterSlice';

const store = configureStore({
  reducer: {
    imageList: imageListReducer,
		imageDetail: imageDetailReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;