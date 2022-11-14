import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import React from 'react';
import ImageCard from './ImageCard';
import ImageMetadata from '../types/ImageMetadata';

interface Props {
	images: ImageMetadata[]
}
export default function Images(props: Props) {
	const { images } = props;
	const imageList = images.map((image) => (
		<Grid item key={image.id} xs={6} md={4} lg={3} xl={2}>
			<ImageCard image={image} />
		</Grid>
	));

	return (
		<Grid container spacing={2} padding={5}>
			{imageList}
		</Grid>
	);
}

