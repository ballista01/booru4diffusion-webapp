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

function HomeScreen() {
	const imageList = useAppSelector(selectImageList);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(listImages());
	}, []);
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