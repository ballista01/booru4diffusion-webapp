import PropTypes from 'prop-types';
import {
	Card, CardContent, CardMedia, Typography
} from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';
// import ImageRating from './ImageRating';
import ImageMetadata from '../types/ImageMetadata'

interface Props {
	image: ImageMetadata
}

export default function ImageCard(props: Props) {
	const { image } = props;
	const tempImg = 'https://source.unsplash.com/random';
	return (
		<Link to={`/image/${image.id}`} style={{ textDecoration: 'none' }}>
			<Card key={image.id} className="card" sx={{ display: 'flex', flexDirection: 'column' }}>
				<CardMedia component="img" image={tempImg} alt={image.title} height={300} />
				<CardContent sx={{ flexGrow: 1 }}>
					<Typography variant="h5">{image.title}</Typography>
					{/* <ImageRating rating={image.rating} numReviews={image.numReviews} /> */}
					<Typography>{`${image.description}`}</Typography>
				</CardContent>
			</Card>
		</Link>
	);
}
