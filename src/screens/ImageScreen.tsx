import {
	Box, Card, CardActions, CardContent, Grid, Typography, Button, Stack,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { MSGBOX_TYPE_ERROR } from '../constants/messageBoxConstants';
import ImageMetadata from '../types/ImageMetadata';
import { selectImageDetail, getImageDetail } from '../slices/imageDetailSlice'
import { useAppDispatch, useAppSelector } from '../hooks';

function ImageScreen() {
	// const [loading, setLoading] = useState(true);
	// const [error, setError] = useState(false);
	// const [errorMessage, setErrorMessage] = useState("");
	// const [image, setImage] = useState<ImageMetadata>();
	// const { id } = useParams();

	const { id } = useParams();
	const imageDetail = useAppSelector(selectImageDetail);
	const dispatch = useAppDispatch();

	// useEffect(() => {
	// 	const fetchImage = async () => {
	// 		try {
	// 			setLoading(true);
	// 			const { data } = await axios.get(`/api/images/${id}`);
	// 			if (data == null || (data as ImageMetadata).id == null) {
	// 				throw new Error("Empty or Invalid Server Response!");
	// 			}
	// 			setImage(data as ImageMetadata);
	// 			setLoading(false);
	// 		} catch (err: any) {
	// 			setError(true);
	// 			setErrorMessage(err.message)
	// 			setLoading(false);
	// 		}
	// 	};
	// 	fetchImage();
	// }, []);

	useEffect(() => {
		dispatch(getImageDetail(id));
	}, [id])

	return (
		<Box display="grid">
			{imageDetail.loading ? (
				<LoadingBox />
			) : imageDetail.error ? (
				<MessageBox type={MSGBOX_TYPE_ERROR} message={imageDetail.errorMessage} />
			) : (
				<Stack p={1}>
					<Link to="/">
						<Typography variant="h6">Back to Result</Typography>
					</Link>
					<Grid container flexDirection="row" spacing={2} marginTop={-1}>
						<Grid item lg={4} xs={12} sx={{ width: '100%' }}>
							<img
								src="https://source.unsplash.com/random"
								alt={imageDetail.image?.title}
								style={{ maxHeight: '100%', maxWidth: '100%' }}
							/>
						</Grid>
						<Grid item lg={4} xs={12}>
							<Typography variant="h3">{imageDetail.image?.title}</Typography>
							{/* <ImageRating
              /> */}
							<Typography variant="h4">{`${imageDetail.image?.timestampUpdated}`}</Typography>
							<Typography variant="h5">Description:</Typography>
							<Typography variant="body1">{imageDetail.image?.description}</Typography>
						</Grid>
						<Grid item lg={4} xs={12}>
							<Card>
								<CardContent>
									<Grid
										container
										sx={{
											display: 'grid',
											gridTemplateColumns: '1fr 1fr',
											gridTemplateRows: '1fr 1fr',
										}}
									>
										<Typography variant="h5" sx={{ justifySelf: 'left' }}>
											Timestamp of Creation
										</Typography>
										<Typography variant="h5" sx={{ justifySelf: 'right' }}>
											{imageDetail.image?.timestampUpdated}
										</Typography>
										<Typography variant="h5" sx={{ justifySelf: 'left' }}>
											Status:
										</Typography>
										<Typography variant="h5" sx={{ justifySelf: 'right' }}>
											{imageDetail.image?.tags && imageDetail.image.tags.length > 0 ? 'has tags' : 'no tags'}
										</Typography>
									</Grid>
								</CardContent>
								<CardActions>
									<Button disabled={imageDetail.image?.tags.length === 0} sx={{ flexGrow: 1 }}>
										Export Tags
									</Button>
								</CardActions>
							</Card>
						</Grid>
					</Grid>
				</Stack>
			)}
		</Box>
	);
}

export default ImageScreen;