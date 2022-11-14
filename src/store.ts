import { configureStore } from '@reduxjs/toolkit';
import imageListReducer from './slices/imageListSlice';
import imageDetailReducer from './slices/imageDetailSlice';
import cartReducer from './slices/cartSlice'

const store = configureStore({
  reducer: {
    imageList: imageListReducer,
		imageDetail: imageDetailReducer,
    cart: cartReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;