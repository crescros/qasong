import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Dialog, Fade } from "@material-ui/core";
import WelcomeWindowContent from "./Content/Content.js";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflowY: "scroll",
  },
}));

export default function TransitionsModal({ darkMode }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  //   const handleOpen = () => {
  //     setOpen(true);
  //   };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog className={classes.modal} open={open} onClose={handleClose}>
        <Fade in={open}>
          <div className={classes.paper}>
            <WelcomeWindowContent {...{ darkMode }} />
          </div>
        </Fade>
      </Dialog>
    </div>
  );
}
