import React from "react";
import { Dialog, Fade, Typography, Button, TextField, Box } from "@material-ui/core";
import { postUserFeedback } from "../../../functions";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "transparent",
    backdropFilter: `blur(8px) brightness(${
      theme.palette.type === "dark" ? "55%" : "150%"
    } )`,
    boxShadow: "none",
  },
}));

export default function TransitionsModal({ showFeedback, setShowFeedback }) {
  const [message, setMessage] = React.useState("");
  const classes = useStyles();

  const handleClose = () => {
    setShowFeedback(false);
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handlePost = () => {
    postUserFeedback(message);
    alert("Thank you for the feedback!");
    handleClose();
  };

  return (
    <Dialog
      open={showFeedback}
      onClose={handleClose}
      PaperProps={{
        classes: {
          root: classes.paper,
        },
      }}
    >
      <Fade in={showFeedback}>
        <Box px={2} py={4}>
          <Box pb={1}>
            <Typography gutterBottom variant="h4" align="center">
              Send Us Feedback
            </Typography>
            <Typography>
              Suggest a feature, report a bug, or say anything else you want about qasong
            </Typography>
          </Box>

          <Box pb={1}>
            <TextField
              id="outlined-multiline-static"
              label="Feedback"
              multiline
              rows={4}
              color="secondary"
              variant="outlined"
              fullWidth
              onChange={handleChange}
            />
          </Box>

          <Box pb={1} align="right">
            <Button variant="contained" color="secondary" onClick={handlePost}>
              send
            </Button>
          </Box>
        </Box>
      </Fade>
    </Dialog>
  );
}
