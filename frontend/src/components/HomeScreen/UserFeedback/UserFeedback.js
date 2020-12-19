import React from "react";
import { Dialog, Fade, Typography, Button, TextField, Box } from "@material-ui/core";
import { postUserFeedback } from "../../../functions";

export default function TransitionsModal({ showFeedback, setShowFeedback }) {
  const [message, setMessage] = React.useState("");

  const handleClose = () => {
    setShowFeedback(false);
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handlePost = () => {
    postUserFeedback(message);
  };

  return (
    <Dialog open={showFeedback} onClose={handleClose}>
      <Fade in={showFeedback}>
        <Box px={2} py={4}>
          <Box pb={1}>
            <Typography gutterBottom variant="h4" align="center">
              Send Us Feedback
            </Typography>
            <Typography>
              Suggest a feature, report a bug, or say anything else you want about
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
