import React from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, Badge } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCart } from '../slices/cartSlice';
import UserProfileMenu from './UserProfileMenu';

export default function Header() {
	const numItemsInCart = useSelector(selectCart).totalQty;
	const navigate = useNavigate();

	const handleCartClick = () => {
		navigate('/cart');
	};

	return (
		<header className="App-header">
			<AppBar position="fixed" color="primary">
				<Toolbar>
					<IconButton edge="start" color="inherit" aria-label="menu">
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" flexGrow={1}>
						<Link to="/" component={RouterLink} sx={{ textDecoration: 'none', color: 'inherit' }}>
							Booru4Diffusion
						</Link>
					</Typography>
					<UserProfileMenu />
					<IconButton edge="end" color="inherit" aria-label="cart" onClick={handleCartClick}>
						<Badge badgeContent={numItemsInCart} color="secondary">
							<ShoppingCartIcon />
						</Badge>
					</IconButton>
				</Toolbar>
			</AppBar>
		</header>
	);
}