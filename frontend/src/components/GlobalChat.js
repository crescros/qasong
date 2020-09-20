import React, { useState, useEffect } from 'react';

import { Drawer, IconButton, Typography, InputBase, InputAdornment, Box } from '@material-ui/core';
import { postGlobalChat, getGlobalChat } from '../functions'
import SendIcon from '@material-ui/icons/Send';

export default function TemporaryDrawer({ user, open, setOpen }) {
    const [chat, setChat] = useState([])
    const [enteredMessage, setEnteredMessage] = useState('')

    useEffect(() => {
        handleLoadChat()
    }, [])

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handlePost = (e) => {
        setEnteredMessage('')
        e.preventDefault()
        postGlobalChat(user.username, enteredMessage).then(data => {
            if (data) {
                handleLoadChat()
            }
        })
    }

    const handleLoadChat = () => {
        getGlobalChat().then(data => {
            if (data) {
                setChat(data.data)

            }
        })
    }

    const onMessageType = (e) => {
        setEnteredMessage(e.target.value)
    }

    if (!user) {
        return <div></div>
    }

    return (
        <Drawer anchor="bottom" open={open} onClose={handleClose}>
            <div style={{ maxHeight: '360px' }} >
                <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>

                    {chat && chat.map((msg, i) => {
                        return <div>
                            <Typography color={user.username === msg.author ? "default" : "secondary"}><Box display='inline' fontWeight="fontWeightBold">{msg.author}</Box>: {msg.content}</Typography>
                            </div>
                    })}
                </div>
                <form onSubmit={handlePost}>
                    <InputBase 
                        startAdornment={<InputAdornment position="start" onClick={handlePost}><IconButton><SendIcon /></IconButton></InputAdornment>} 
                        onChange={onMessageType}
                         value={enteredMessage} 
                         style={{ width: '100%' }} />
                </form>
            </div>
        </Drawer>
    );
}