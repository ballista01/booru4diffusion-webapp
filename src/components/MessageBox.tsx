
// import PropTypes from 'prop-types';
import { Stack, Typography } from '@mui/material';
import ErrorIcon from '@mui/material/Icon';
import React from 'react';
import { MSGBOX_TYPE_ERROR } from '../constants/messageBoxConstants';


interface Props {
	type: string,
	message: string
}

function MessageBox(props: Props) {
	const { type, message } = props;
	return (
		<Stack spacing={2}>
			{type === MSGBOX_TYPE_ERROR ? <ErrorIcon /> : null}
			<Typography variant="h4">{message}</Typography>
		</Stack>
	);
}


export default MessageBox;