import React, { FormEvent, useState } from 'react';
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
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { findImagesByTagNames } from '../slices/imageListSlice';

export default function Header() {
	const numItemsInCart = useSelector(selectCart).totalQty;
	const navigate = useNavigate();
	// const [text, setText] = useState("");

	const handleCartClick = () => {
		navigate('/cart');
	};

	const Search = styled('div')(({ theme }) => ({
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: alpha(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: alpha(theme.palette.common.white, 0.25),
		},
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(1),
			width: 'auto',
		},
	}));

	const SearchIconWrapper = styled('div')(({ theme }) => ({
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	}));

	const StyledInputBase = styled(InputBase)(({ theme }) => ({
		color: 'inherit',
		'& .MuiInputBase-input': {
			padding: theme.spacing(1, 1, 1, 0),
			paddingLeft: `calc(1em + ${theme.spacing(4)})`,
			transition: theme.transitions.create('width'),
			width: '100%',
			[theme.breakpoints.up('sm')]: {
				width: '12ch',
				'&:focus': {
					width: '20ch',
				},
			},
		},
	}));

	const handleSearch = (e: any) => {
		if (e.key === "Enter") {
			// console.log("enter key down in search bar");
			// console.log("search bar text is ")
			console.log(e.target.value);
			navigate(`/?tags=${e.target.value}`);
		}

	}

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
					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder="Search…"
							inputProps={{ 'aria-label': 'search' }}
							// onChange={(e) => setText(e.target.value)}
							onKeyDown={handleSearch}
						/>
					</Search>
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