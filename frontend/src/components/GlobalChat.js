import React, { useState, useEffect } from 'react';

import { Drawer, IconButton, Typography, InputBase, InputAdornment, Box } from '@material-ui/core';
import { postGlobalChat, getGlobalChat } from '../functions'
import SendIcon from '@material-ui/icons/Send';

export default function TemporaryDrawer({ user, open, setOpen }) {
    const [chat, setChat] = useState([])
    const [enteredMessage, setEnteredMessage] = useState('')

    useEffect(() => {

        handleLoadChat()
        const refreshRef = setInterval(handleLoadChat, process.env.REACT_APP_CHAT_REFRESH_RATE)

        return () => {
            clearInterval(refreshRef)
        }
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
        <Drawer anchor="right" open={open} onClose={handleClose}>
            <div style={{ maxWidth: '360px', marginLeft: '20px', marginTop:'auto', wordWrap: 'break-word' }} >
                <div style={{ display: 'flex', flexDirection: 'column-reverse', alignContent: 'flex-end'}}>

                    {chat && chat.map((msg, i) => {

                        let newAuthor = false

                        if (i < chat.length - 1 && msg.author !== chat[i + 1].author) {
                            newAuthor = true
                        }

                        return <div key={msg.id}>{
                            newAuthor ? <><Typography color={user.username === msg.author ? "initial" : "secondary"} fontWeight="fontWeightBold">{msg.author} {msg.created_at}</Typography>
                                <Typography style={{ marginLeft: '20px' }} color={user.username === msg.author ? "initial" : "secondary"}>{msg.content}</Typography></>
                                : <Typography style={{ marginLeft: '20px' }} color={user.username === msg.author ? "initial" : "secondary"}>{msg.content}</Typography>

                        }
                        </div>
                    })}
                </div>
                <form onSubmit={handlePost}>
                    <InputBase
                        startAdornment={<InputAdornment position="start" onClick={handlePost}><IconButton><SendIcon /></IconButton></InputAdornment>}
                        onChange={onMessageType}
                        value={enteredMessage}
                        style={{ width: '100%' }} 
                        autoFocus={true}    
                    />
                </form>
            </div>
        </Drawer>
    );
}