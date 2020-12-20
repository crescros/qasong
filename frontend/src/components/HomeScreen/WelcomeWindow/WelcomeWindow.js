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
    background: "none",
  },
  paper: {
    backgroundColor: "transparent",
    backdropFilter: `blur(8px) brightness(${
      theme.palette.type === "dark" ? "55%" : "150%"
    } )`,
    boxShadow: "none",
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
    <Dialog
      className={classes.modal}
      open={showAboutUs}
      onClose={handleClose}
      PaperProps={{
        classes: {
          root: classes.paper,
        },
      }}
    >
      <Fade in={showAboutUs}>
        <WelcomeWindowContent />
      </Fade>
    </Dialog>
  );
}
