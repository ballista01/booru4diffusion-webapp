import React from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Header() {
	return (
		<header className="App-header">
			<AppBar position="sticky" color="primary">
				<Toolbar>
					<IconButton edge="start" color="inherit" aria-label="menu">
						<MenuIcon />
					</IconButton>
					<Typography variant="h6">Booru4Diffusion</Typography>
				</Toolbar>
			</AppBar>
		</header>
	);
}