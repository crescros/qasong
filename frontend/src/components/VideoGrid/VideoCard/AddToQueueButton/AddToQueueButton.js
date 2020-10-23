import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
    Tooltip,
    Box,
    IconButton,
    Typography,
    Popover
} from "@material-ui/core"

import {
    Queue as QueueIcon
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));

function AddToQueueButton({ handleAddQueue }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        handleAddQueue(event)
        setAnchorEl(event.currentTarget);
        setTimeout(handleClose, 1250)
    };

    const handleClose = (event) => {
        setAnchorEl(null);
        event.stopPropagation()

    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <Tooltip
            open={open}
            onClose={handleClose}
            title="added to queue"
        >
            <IconButton onClick={handleClick} style={{ background: "#00000080", color: "white" }}>
                <QueueIcon />
            </IconButton>
        </Tooltip>
    )
}

export default AddToQueueButton
