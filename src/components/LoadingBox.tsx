
import { CircularProgress, Stack, Typography } from '@mui/material';
import React from 'react';

function LoadingBox() {
	return (
		<Stack spacing={2} direction="column">
			<CircularProgress />
			<Typography variant='h4'>Loading...</Typography>
		</Stack>
	);
}

export default LoadingBox;