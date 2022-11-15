import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { signOut, selectUserSignin } from '../slices/userSigninSlice';
import { useAppDispatch, useAppSelector } from '../hooks';

export default function UserProfileMenu() {
	const [anchorEl, setAnchorEl] = useState(null);
	const dispatch = useAppDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const userSignin = useAppSelector(selectUserSignin);

	const handleClick = (e: any) => {
		setAnchorEl(e.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleSignOut = () => {
		setAnchorEl(null);
		dispatch(signOut());
	};
	const handleSigninClick = () => {
		// let redirect = location.pathname;
		// if (redirect === '/register' || redirect === '/signin') redirect = '';
		// console.log(`redirecting to /signin?redirect=${redirect}`);
		// console.log(`localStorage.getItem('userInfo') = ${localStorage.getItem('userInfo')}`);
		navigate(`/signin`);
	};

	return (
		<div>
			{userSignin.userInfo ? (
				<div>
					<Button id="user-profile" onClick={handleClick} color="inherit" variant="text">
						{userSignin.userInfo.username}
					</Button>
					<Menu
						id="user-profile-menu"
						anchorEl={anchorEl}
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						<MenuItem onClick={handleClose}>Settings</MenuItem>
						<MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
					</Menu>
				</div>
			) : (
				<Button type="submit" color="inherit" onClick={handleSigninClick}>
					Sign In
				</Button>
			)}
		</div>
	);
}