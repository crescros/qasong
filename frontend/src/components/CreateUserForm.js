import React from 'react';
import { Avatar, Button, CssBaseline, TextField, Typography, Container, CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab/'
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}));

export default function SignIn({ handleCreateUserFormSubmit, error, loading }) {

	const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				{
					loading && <CircularProgress />
				}
				{
					error && <Alert severity="error">{error}</Alert>
				}
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					create an account for {process.env.REACT_APP_NAME}
				</Typography>
				<form
					className={classes.form} 
					noValidate 
					onSubmit={handleCreateUserFormSubmit}
				>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="confirmpassword"
						label="Confirm Password"
						type="password"
						id="confirmpassword"
						autoComplete="current-password"
					/>

					<Button 
						type="submit" 
						fullWidth 
						variant="contained" 
						color="primary" 
						className={classes.submit}
						children="Create Account"
					/>
	
				</form>
			</div>
		</Container>
	);
}
