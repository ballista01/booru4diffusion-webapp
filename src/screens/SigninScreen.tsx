import React, { FormEvent, useEffect, useState } from 'react';
import {
	Button, Paper, Stack, TextField, Link, Typography, Container,
} from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserSignin, signin } from '../slices/userSigninSlice';
import LoadingBox from '../components/LoadingBox';
import { useAppDispatch, useAppSelector } from '../hooks';

export default function SigninScreen() {
	// const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const location = useLocation();
	const navigate = useNavigate();
	const userSignin = useAppSelector(selectUserSignin);
	const { userInfo, loading, error, errorMessage } = userSignin;
	const dispatch = useAppDispatch();

	const redirect = location.search ? location.search.split('=')[1] : '/';

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		dispatch(signin(username, password));
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
							<Typography variant="h4">Sign In</Typography>
							<TextField
								id="username-field"
								label="Username"
								variant="outlined"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								autoComplete="username"
								required
								autoFocus
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
							<Stack direction="row" alignItems="baseline" spacing={5}>
								<Link component={RouterLink} to={`/register?redirect=${redirect}`}>
									New user? Sign up!
								</Link>
								<Button variant="contained" color="secondary" type="submit">
									Sign In
								</Button>
							</Stack>
						</Stack>
					</form>
				</Paper>
			)}
		</Container>
	);
}