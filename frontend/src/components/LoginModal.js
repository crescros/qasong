import React, { useState } from 'react';
import { Typography, Modal, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LoginForm from './LoginForm';

function rand() {
	return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
	const top = 50 + rand();
	const left = 50 + rand();

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`
	};
}

const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3)
	}
}));

function LoginModal() {
	const classes = useStyles();
	const [ modalStyle ] = React.useState(getModalStyle);
	const [ open, setOpen ] = useState(false);
	function handleOpen() {
		setOpen(true);
	}

	function handleClose() {
		setOpen(false);
	}
	return (
		<div>
			<Button variant="outlined" onClick={handleOpen}>
				Login
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				<div style={modalStyle} className={classes.paper}>
					<LoginForm />
				</div>
			</Modal>
		</div>
	);
}

export default LoginModal;
