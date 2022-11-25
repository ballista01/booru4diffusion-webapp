import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// import { Dispatch } from 'react';
import ImageMetadata from '../types/ImageMetadata';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { AppDispatch } from '../store';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectUserSignin } from './userSigninSlice';

export type ImageListState = {
  loading: boolean,
  error: boolean,
  errorMessage: string,
  images: ImageMetadata[],
  tagQueryStr: string,
}

const initialState: ImageListState = {
  loading: true,
  error: false,
  errorMessage: "",
  images: [],
  tagQueryStr: "",
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
    updateTagQueryStr: (state, action: PayloadAction<string>) => {
      state.tagQueryStr = action.payload;
    }
  },
});

export const { imageListRequest, imageListFail, imageListSuccess, updateTagQueryStr } = imageListSlice.actions;

// export const listImages = () => async (dispatch: AppDispatch) => {
//   const tagNames = useAppSelector(selectImageList).tagQueryStr;
//   if(tagNames === "") {
//     dispatch(listAllImages);
//   } else {
//     dispatch(findImagesByTagNames(tagNames))
//   }
// };

// export const listAllImages = () => async(dispatch: AppDispatch) => {
//   dispatch(imageListRequest);
//   try {
//     const { data } = await axios.get('/api/images');
//     dispatch(imageListSuccess(data));
//   } catch (error: any) {
//     dispatch(imageListFail(error.message));
//   }
// }

export const listImages = (token: string | undefined) => async(dispatch: AppDispatch) => {
  dispatch(imageListRequest);
  try {
    const { data } = (token != undefined && token != "") ?
    await axios.get('/api/images', { 'headers': {'Authorization': `Bearer ${token}`}})
    :
    await axios.get('/api/images');
    dispatch(imageListSuccess(data));
  } catch (error: any) {
    dispatch(imageListFail(error.message));
  }
}

export const setTagQueryStr = (tagNames: string) => async (dispatch: AppDispatch) => {
  dispatch(updateTagQueryStr(tagNames));
}

export const findImagesByTagNames = (tagNames: string) => async (dispatch: AppDispatch) => {
  dispatch(imageListRequest);
  try{
    const { data } = await axios.get(`/api/images?tags=${tagNames}`);
    dispatch(imageListSuccess(data));
  } catch (error: any) {
    dispatch(imageListFail(error.message))
  }
}

export const selectImageList = (state: RootState) => state.imageList;
export default imageListSlice.reducer;