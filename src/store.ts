import { configureStore } from '@reduxjs/toolkit';
import imageListReducer from './slices/imageListSlice';
import imageDetailReducer from './slices/imageDetailSlice';

const store = configureStore({
  reducer: {
    imageList: imageListReducer,
		imageDetail: imageDetailReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;