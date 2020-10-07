import React from "react"
import Modal from "@material-ui/core/Modal"
import makeStyles from "@material-ui/styles/makeStyles"
import CreateUserForm from "./CreateAccountForm"

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
}))

function CreateUserModal({
  modalOpen,
  handleModalClose,
  error,
  handleCreateUserFormSubmit,
  loading,
}) {
  const classes = useStyles()

  return (
    <Modal
      open={modalOpen}
      onClose={handleModalClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={classes.paper}>
        <CreateUserForm
          handleCreateUserFormSubmit={handleCreateUserFormSubmit}
          error={error}
          loading={loading}
        />
      </div>
    </Modal>
  )
}

export default CreateUserModal
