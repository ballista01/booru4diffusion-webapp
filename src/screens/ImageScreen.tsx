import {
	Box, Card, CardActions, CardContent, Grid, Typography, Button,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { MSGBOX_TYPE_ERROR } from '../constants/messageBoxConstants';
import ImageMetadata from '../types/ImageMetadata';

function ImageScreen() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [image, setImage] = useState<ImageMetadata>();
	// const { Images } = sampleData;
	const { id } = useParams();
	// const Image = Images.find((entry) => entry._id === ImageId);

	useEffect(() => {
		const fetchImage = async () => {
			try {
				setLoading(true);
				const { data } = await axios.get(`/api/images/${id}`);
				if (data == null || (data as ImageMetadata).id == null) {
					throw new Error("Empty or Invalid Server Response!");
				}
				setImage(data as ImageMetadata);
				setLoading(false);
			} catch (err: any) {
				setError(true);
				setErrorMessage(err.message)
				setLoading(false);
			}
		};
		fetchImage();
	}, []);

	return (
		<Box flexDirection="column">
			{loading ? (
				<LoadingBox />
			) : error ? (
				<MessageBox type={MSGBOX_TYPE_ERROR} message={errorMessage} />
			) : (
				<Box>
					<Link to="/">
						<Typography variant="h6">Back to Result</Typography>
					</Link>
					<Grid container spacing={2} flexDirection="row" sx={{ margin: 'auto' }}>
						<Grid item lg={4} xs={12} sx={{ width: '100%' }}>
							<img
								src="https://source.unsplash.com/random"
								alt={image!.title}
								style={{ maxHeight: '100%', maxWidth: '100%' }}
							/>
						</Grid>
						<Grid item lg={4} xs={12}>
							<Typography variant="h3">{image!.title}</Typography>
							{/* <ImageRating
              /> */}
							<Typography variant="h4">{`${image!.timestampUpdated}`}</Typography>
							<Typography variant="h5">Description:</Typography>
							<Typography variant="body1">{image!.description}</Typography>
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
											{image!.timestampUpdated}
										</Typography>
										<Typography variant="h5" sx={{ justifySelf: 'left' }}>
											Status:
										</Typography>
										<Typography variant="h5" sx={{ justifySelf: 'right' }}>
											{image!.tags.length > 0 ? 'has tags' : 'no tags'}
										</Typography>
									</Grid>
								</CardContent>
								<CardActions>
									<Button disabled={image!.tags.length === 0} sx={{ flexGrow: 1 }}>
										Export Tags
									</Button>
								</CardActions>
							</Card>
						</Grid>
					</Grid>
				</Box>
			)}
		</Box>
	);
}

export default ImageScreen;