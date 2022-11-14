import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// import { Dispatch } from 'react';
import ImageMetadata from '../types/ImageMetadata';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { AppDispatch } from '../store';

export type ImageListState = {
  loading: boolean,
  error: boolean,
  errorMessage: string,
  images: ImageMetadata[],
}

const initialState: ImageListState = {
  loading: true,
  error: false,
  errorMessage: "",
  images: [],
};

const imageListSlice = createSlice({
  name: 'imageList',
  initialState,
  reducers: {
    imageListRequest: (state) => {
      state.loading = true;
    },
    imageListFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = true;
      state.errorMessage = action.payload;
    },
    imageListSuccess: (state, action: PayloadAction<ImageMetadata[]>) => {
      state.loading = false;
      state.images = action.payload;
    },
  },
});

export const { imageListRequest, imageListFail, imageListSuccess} = imageListSlice.actions;

export const listImages = () => async (dispatch: AppDispatch) => {
  dispatch(imageListRequest);
  try {
    const { data } = await axios.get('/api/images');
    dispatch(imageListSuccess(data));
  } catch (error: any) {
    dispatch(imageListFail(error.message));
  }
};

export const selectImageList = (state: RootState) => state.imageList;
export default imageListSlice.reducer;