import React from 'react'
import { FormControlLabel, Tooltip, Box, IconButton, Badge, Switch } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles";

import { copyCurrentURL } from "../../../functions"
import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import ReplyIcon from "@material-ui/icons/Reply";


const useStyles = makeStyles((theme) => ({
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex",
        },
    }
}));

function DesktopMenu({ queue, showQueue, darkMode, setDarkMode, setShowQueue }) {
    const classes = useStyles();
    return (
        <div className={classes.sectionDesktop}>

            <FormControlLabel
                style={{ color: "white" }}
                control={
                    <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                }
                label={darkMode ? "dark mode" : "light mode"}
                color="red"
            />

            <Tooltip
                title={
                    queue.length === 0 ? "Search for songs and add them to your queue" : ""
                }
            >
                <Box>
                    <IconButton
                        disabled={queue.length === 0}
                        edge="end"
                        title={showQueue ? "hide queue" : "show queue"}
                        color={showQueue ? "secondary" : "inherit"}
                        onClick={() => setShowQueue(!showQueue)}
                        target="_blank"
                    >
                        <Badge badgeContent={queue.length} color="secondary">
                            <QueueMusicIcon style={{ fontSize: "40px" }} />
                        </Badge>
                    </IconButton>
                </Box>
            </Tooltip>

            {/* share button */}
            <Tooltip
                title={
                    queue.length === 0 ? "Search for songs and add them to your queue" : ""
                }
            >
                <Box mt={1}>
                    <IconButton
                        edge="end"
                        title="Copy Link to Current Queue"
                        disabled={queue.length === 0}
                        onClick={copyCurrentURL}
                        target="_blank"
                        color={queue.length === 0 ? "inherit" : "secondary"}
                    >
                        <ReplyIcon />
                    </IconButton>
                </Box>
            </Tooltip>
        </div>
    )
}

export default DesktopMenu
