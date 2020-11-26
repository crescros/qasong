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

export default function TransitionsModal({ showAboutUs, setShowAboutUs }) {
  const classes = useStyles();

  //   const handleOpen = () => {
  //     setOpen(true);
  //   };

  const handleClose = () => {
    setShowAboutUs(false);
  };

  return (
    <div>
      <Dialog className={classes.modal} open={showAboutUs} onClose={handleClose}>
        <Fade in={showAboutUs}>
          <div className={classes.paper}>
            <WelcomeWindowContent />
          </div>
        </Fade>
      </Dialog>
    </div>
  );
}
