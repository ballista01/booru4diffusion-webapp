import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';
import Images from '../components/Images';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { MSGBOX_TYPE_ERROR } from '../constants/messageBoxConstants';
// import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../hooks';
import { listImages, selectImageList } from '../slices/imageListSlice';
import { useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { findImagesByTagNames } from '../slices/imageListSlice';
import { setTagQueryStr } from '../slices/imageListSlice';
import { selectUserSignin } from '../slices/userSigninSlice';

function HomeScreen() {
	const imageList = useAppSelector(selectImageList);
	const dispatch = useAppDispatch();
	const userSignin = useAppSelector(selectUserSignin);
	const token = userSignin.userInfo?.accessToken;

	useEffect(() => {
		dispatch(listImages(token));
	}, [])
	return (
		<Box>
			{imageList.loading ? (
				<LoadingBox />
			) : imageList.error ? (
				<MessageBox type={MSGBOX_TYPE_ERROR} message={imageList.errorMessage} />
			) : (
				<Images images={imageList.images} />
			)}
		</Box>
	);
}

export default HomeScreen;