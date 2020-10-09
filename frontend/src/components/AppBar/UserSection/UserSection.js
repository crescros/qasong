import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import LoginModal from "../../LoginModal";
import { authenticateUser, createUser } from "../../../functions";
import UserMenu from "./UserMenu";
import CreateUserModal from "../../CreateAccountModal";

function UserSection({ user, setUser, setGlobalChatOpen }) {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [createUserModalOpen, setCreateUserModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [error, setErorr] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    let storedUser = localStorage.getItem("user");

    if (storedUser) {
      console.log(storedUser);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  function handleClick(event) {
    if (!user) {
      setLoginModalOpen(true);
    } else {
      setAnchorEl(event.currentTarget);
      setMenuOpen(true);
    }
  }

  async function handleLoginFormSubmit(e) {
    e.preventDefault();
    const enteredUsername = e.target.email.value;
    const enteredPassword = e.target.password.value;

    setLoading(true);
    const response = await authenticateUser(enteredUsername, enteredPassword);

    if (response.status === 200) {
      setUser(response.data);
      console.log(user);
      localStorage.setItem("user", JSON.stringify(response.data));
      handleLoginModalClose();
      setLoading(false);
    } else {
      setErorr("There was an issue with your login attempt. Please try again");
      setLoading(false);
    }
  }

  async function handleCreateUserFormSubmit(e) {
    e.preventDefault();
    const enteredUsername = e.target.email.value;
    const enteredPassword = e.target.password.value;
    const enteredConfirmPassword = e.target.confirmpassword.value;

    if (enteredPassword !== enteredConfirmPassword) {
      setErorr("passwords dont match");

      return;
    } else {
      setLoading(true);
      const response = await createUser(enteredUsername, enteredPassword);

      if (response) {
        setLoading(false);
        setMessage("created user");
        handleCreateUserModalClose();
        setLoginModalOpen(true);
      } else {
        setLoading(false);
        setErorr("couldn't create user");
      }
    }
  }

  function handleCreateUserClick() {
    setLoginModalOpen(false);
    setCreateUserModalOpen(true);
  }

  function handleLoginModalClose() {
    setErorr();
    setLoginModalOpen(false);
  }
  function handleCreateUserModalClose() {
    setErorr();
    setCreateUserModalOpen(false);
  }

  function handleMenuClose() {
    setMenuOpen(false);
    setAnchorEl(null);
  }

  function handleLogOut() {
    setUser();
    localStorage.clear();
    handleMenuClose();
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClick}>
        {user ? user.username : "Login"}
      </Button>
      <UserMenu
        anchorEl={anchorEl}
        handleLogOut={handleLogOut}
        handleMenuClose={handleMenuClose}
        menuOpen={menuOpen}
        setGlobalChatOpen={setGlobalChatOpen}
      />

      <LoginModal
        loading={loading}
        message={message}
        modalOpen={loginModalOpen}
        handleModalClose={handleLoginModalClose}
        error={error}
        handleLoginFormSubmit={handleLoginFormSubmit}
        handleCreateUserClick={handleCreateUserClick}
      />

      <CreateUserModal
        modalOpen={createUserModalOpen}
        handleModalClose={handleCreateUserModalClose}
        error={error}
        handleCreateUserFormSubmit={handleCreateUserFormSubmit}
      />
    </div>
  );
}

export default UserSection;
