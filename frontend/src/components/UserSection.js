import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import LoginModal from './LoginModal';
import { authenticateUser } from '../functions'
import UserMenu from './UserMenu';

function UserSection({ user, setUser }) {
	const [modalOpen, setModalOpen] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const [error, setErorr] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null);
	
	useEffect(() => {
		let storedUser = localStorage.getItem('user')
		
		if (storedUser) {
			setUser(JSON.parse(storedUser))
		}
	}, [])
	
	function handleClick(event) {
		if (!user) {
			setModalOpen(true);
		} else {
			setAnchorEl(event.currentTarget);
			setMenuOpen(true)
		}
	}

	async function handleLoginFormSubmit(e) {
		e.preventDefault()
		const enteredUsername = e.target.email.value
		const enteredPassword = e.target.password.value

		const response = await authenticateUser(enteredUsername, enteredPassword)

		if (response.status === 200) {
			setUser(response.data)
			localStorage.setItem('user', JSON.stringify(response.data))
			handleModalClose()
		} else {
			setErorr("There was an issue with your login attempt. Please try again")
		}
	}

	function handleModalClose() {
		setErorr()
		setModalOpen(false);
	}

	function handleMenuClose() {
		setMenuOpen(false);
		setAnchorEl(null);
	}

	function handleLogOut() {
		setUser()
		localStorage.clear()
		handleMenuClose()
	}

	return (
		<div>
			<Button 
				variant="outlined" 
				onClick={handleClick} 
				children={user ? user.username : "Login"}
			/>

			<UserMenu
				anchorEl={anchorEl}
				handleLogOut={handleLogOut} 
				handleMenuClose={handleMenuClose} 
				menuOpen={menuOpen} 
			/>

			<LoginModal
				modalOpen={modalOpen}
				handleModalClose={handleModalClose}
				error={error}
				handleLoginFormSubmit={handleLoginFormSubmit} 
			/>
		</div>
	);
}

export default UserSection;
