import {
	Box, Card, CardActions, CardContent, Grid, Typography, Button, Stack, Chip, Paper
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { MSGBOX_TYPE_ERROR } from '../constants/messageBoxConstants';
import ImageMetadata from '../types/ImageMetadata';
import { selectImageDetail, getImageDetail } from '../slices/imageDetailSlice'
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectCart } from '../slices/cartSlice';
import TagChip from '../components/TagChip';

function ImageScreen() {

	const { id } = useParams();
	const imageDetail = useAppSelector(selectImageDetail);
	const cart = useAppSelector(selectCart);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getImageDetail(id));
	}, [id]);

	const checkOutHandler = () => {
		let tagStr = "";
		for (let i = 0; i < cart.cartItems.length; i++) {
			tagStr = tagStr.concat(cart.cartItems[i].name).concat(' ');
		}
		navigate(`/checkout?tagStr=${tagStr}`);
	};

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
						<Grid item container lg={4} xs={12}>
							<Paper sx={{ width: '100%' }}>
								<Stack p={1}>
									<Typography variant='h5'>Tags</Typography>
									<Stack paddingTop={2} spacing={1.5}>
										{imageDetail.image?.tags.map((tag) => {
											const existedTag = cart.cartItems.find((x) => x.id === tag.id);
											if (existedTag) return <TagChip key={tag.id} tag={tag} inCart={true} />
											else return <TagChip key={tag.id} tag={tag} inCart={false} />
										})}
									</Stack>
									<Stack paddingTop={5}>
										<Button
											disabled={cart.totalQty <= 0}
											sx={{ flexGrow: 1 }}
											onClick={checkOutHandler}
											variant={cart.totalQty <= 0 ? 'outlined' : 'contained'}
										>
											{cart.totalQty <= 0 ? 'No Tag Selected' : 'Genernate List'}
										</Button>
									</Stack>
								</Stack>
							</Paper>
						</Grid>
						<Grid item lg={8} xs={12} sx={{ width: '100%' }}>
							<img
								src={`/api/images/file/${id}`}
								alt={imageDetail.image?.title}
								style={{ maxHeight: '100%', maxWidth: '100%' }}
							/>
						</Grid>

					</Grid>
				</Stack>
			)}
		</Box>
	);
}

export default ImageScreen;