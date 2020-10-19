import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { MenuItem, Typography, FormControlLabel, Switch } from '@material-ui/core'

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.primary.dark,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

export default function SimpleModal({user, darkMode, setDarkMode}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Typography variant="h5" >{user.username}'s Profile</Typography>
      <Typography>
        username: {user.username}
      </Typography>
      <Typography>
        e-mail: {user.email}
      </Typography>
      <FormControlLabel
        style={{ color: "white" }}
        control={<Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />}
        label={darkMode ? "dark mode" : "light mode"}
        color="red"
      />

    </div>
  );

  return (
    <div>
      <MenuItem onClick={handleOpen}>
        Profile
      </MenuItem>
      <Modal
        open={open}
        onClose={handleClose}
      >
        {body}
      </Modal>
    </div>
  );
}