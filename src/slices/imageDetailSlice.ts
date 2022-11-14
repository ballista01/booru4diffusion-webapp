import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import ImageMetadata from '../types/ImageMetadata';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { AppDispatch } from '../store';

export type ImageDetailState = {
	loading: boolean,
	error: boolean,
	errorMessage: string,
	image: ImageMetadata | null
}
const initialState: ImageDetailState = {
  loading: true,
  error: false,
	errorMessage: "",
  image: null,
};

const imageDetailSlice = createSlice({
  name: 'imageDetail',
  initialState,
  reducers: {
    imageDetailRequest: (state) => {
      state.loading = true;
    },
    imageDetailFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = true;
			state.errorMessage = action.payload;
    },
    imageDetailSuccess: (state, action: PayloadAction<ImageMetadata>) => {
      state.loading = false;
      state.image = action.payload;
    },
  },
});

// eslint-disable-next-line max-len
export const { imageDetailFail, imageDetailRequest, imageDetailSuccess } = imageDetailSlice.actions;

export const getImageDetail = (imageId: string | undefined) => async (dispatch: AppDispatch) => {
  if(imageId == undefined || imageId == "") {
		dispatch(imageDetailFail("Undefined or empty image ID!"));
		return;
	}
	dispatch(imageDetailRequest);
  try {
    const { data } = await axios.get(`/api/images/${imageId}`);
    dispatch(imageDetailSuccess(data));
  } catch (error: any) {
    dispatch(
      imageDetailFail(error.response?.data?.message ? error.response.data.message : error.message),
    );
  }
};

export const selectImageDetail = (state: RootState) => state.imageDetail;

export default imageDetailSlice.reducer;