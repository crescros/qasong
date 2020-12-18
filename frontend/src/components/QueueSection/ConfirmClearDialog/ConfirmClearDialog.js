import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@material-ui/core";

function ConfirmClearDialog(props) {
  const { setQueue, confirmDialog, setConfirmDialog } = props;

  function handleClickYes() {
    setQueue([]);
  }

  function handleClickNo() {
    setConfirmDialog({ ...confirmDialog, isOpen: false });
  }

  return (
    <Dialog
      open={confirmDialog.isOpen}
      PaperProps={{ style: { backgroundColor: "orange", boxShadow: "none" } }}
    >
      <DialogTitle>
        <Typography variant="h6" color="primary">
          {confirmDialog.title}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Typography variant="subtitle2" color="primary">
          {confirmDialog.subTitle}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClickYes}>
          <Typography color="primary"> Yes </Typography>
        </Button>
        <Button onClick={handleClickNo}>
          <Typography color="primary"> No </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmClearDialog;
