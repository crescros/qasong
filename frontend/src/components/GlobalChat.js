import React, { useState, useEffect } from 'react';

import { Drawer, Button, Typography, InputBase } from '@material-ui/core';
import { postGlobalChat, getGlobalChat } from '../functions'

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

    const handlePost = () => {
        postGlobalChat(user.username, enteredMessage).then(data =>{
            if(data){
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
        return <div>ello</div>
    }

    return (
        <Drawer anchor="bottom" open={open} onClose={handleClose}>
            <div>
                {chat && chat.map(msg => {
                    return <Typography>{msg.author}: {msg.content}</Typography>
                })}
                <InputBase onChange={onMessageType} />
                <Button onClick={handlePost}>post</Button>
            </div>
        </Drawer>
    );
}