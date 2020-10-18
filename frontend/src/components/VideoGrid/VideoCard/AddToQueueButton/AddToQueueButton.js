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
    return (<>
        <IconButton onClick={handleClick} style={{ background: "#00000080", color: "white" }}>
            <QueueIcon />
        </IconButton>
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <Typography className={classes.typography}>added to queue</Typography>
        </Popover>
    </>
    )
}

export default AddToQueueButton
