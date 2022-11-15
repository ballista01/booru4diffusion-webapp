import React, { FormEvent, useEffect, useState } from 'react';
import {
	Button, Paper, Stack, TextField, Typography, Container,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectUserRegister, register } from '../slices/userRegisterSlice';
import { selectUserSignin } from '../slices/userSigninSlice';
import LoadingBox from '../components/LoadingBox';
import type UserInfo from '../types/UserInfo';
import { useAppDispatch, useAppSelector } from '../hooks';

export default function RegisterScreen() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const location = useLocation();
	const navigate = useNavigate();
	const userRegister = useAppSelector(selectUserRegister);
	const { userInfo } = useAppSelector(selectUserSignin);
	const { loading, error } = userRegister;
	const dispatch = useAppDispatch();

	const redirect = location.search ? location.search.split('=')[1] : '/';

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		dispatch(register(name, email, password));
	};

	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [userInfo]);

	return (
		<Container
			sx={{
				marginTop: 8,
				marginBottom: 8,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			{loading ? (
				<LoadingBox />
			) : (
				<Paper>
					<form onSubmit={handleSubmit}>
						<Stack spacing={5} padding={5}>
							<Typography variant="h4">Register</Typography>
							<TextField
								id="name-field"
								label="Name"
								variant="outlined"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
								autoFocus
								autoComplete="name"
							/>
							<TextField
								id="email-field"
								label="E-mail"
								variant="outlined"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								autoComplete="email"
								required
							/>
							<TextField
								id="password-field"
								label="Password"
								variant="outlined"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								type="password"
								autoComplete="current-password"
								required
							/>
							{error ? <span style={{ color: 'red' }}>{error}</span> : ''}
							<Button variant="contained" color="secondary" type="submit">
								Sign Up
							</Button>
						</Stack>
					</form>
				</Paper>
			)}
		</Container>
	);
}