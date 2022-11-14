
import { CircularProgress, Stack, Typography } from '@mui/material';
import React from 'react';

function LoadingBox() {
	return (
		<Stack spacing={2} p={2} justifySelf="center">
			<CircularProgress sx={{ alignSelf: 'center' }} />
			<Typography variant='h4'>Loading...</Typography>
		</Stack>
	);
}

export default LoadingBox;