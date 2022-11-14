import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';
// import sampleData from '../resource/data';
import Images from '../components/Images';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { MSGBOX_TYPE_ERROR } from '../constants/messageBoxConstants';

function HomeScreen() {
	// const { images } = sampleData;
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const { data } = await axios.get('/api/images');
				setLoading(false);
				setImages(data);
			} catch (err: any) {
				setError(true);
				setErrorMessage(err.message);
				setLoading(false);
			}
		};
		fetchData();
	}, []);
	return (
		<Box>
			{loading ? (
				<LoadingBox />
			) : error ? (
				<MessageBox type={MSGBOX_TYPE_ERROR} message={errorMessage} />
			) : (
				<Images images={images} />
			)}
		</Box>
	);
}

export default HomeScreen;