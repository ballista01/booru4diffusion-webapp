
import { Box, Typography } from '@mui/material';
import React from 'react';

export default function Footer() {
	return (
		<Box sx={{ backgroundColor: '#1976d2', padding: 6 }} component="footer">
			<Typography variant="h6" align="center">
				Booru4Diffusion
			</Typography>
			<Typography variant="h6" align="center">
				Copyright © Ballista01
			</Typography>
		</Box>
	);
}