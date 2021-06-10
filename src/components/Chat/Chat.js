import React, { useState, useEffect } from 'react'

import Database from '../../firebase';
import  './Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router';
import { useStateValue } from '../../StateProvider';
import firebase from 'firebase';

const Chat = (props) => {
    const [inputValue, setInputValue] = useState("");
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();
    const {roomId} = useParams();



    useEffect(() => {
        if(roomId){
            Database.collection('rooms')
            .doc(roomId)
            .onSnapshot((snapShot) => setRoomName(
                snapShot.data().name
            ))
        }

        Database.collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot( snapshot => (setMessages(snapshot.docs.map(doc => doc.data()))
        ));         
    }, [roomId]);

    // setMessages(snapShot.docs.map(doc => doc.data())
    const setInputHandler = (event) => {
        setInputValue(event.target.value);
    }

    const sendMessage = (e) => {
        e.preventDefault();

        Database.collection('rooms').doc(roomId)
        .collection('messages').add({
            message: inputValue,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        setInputValue('');
    }

    return (
        <div className='chat'>

        {/* chat header */}

        <div className='chatHeader' >
            <Avatar src={`https://avatars.dicebear.com/api/avataaars/${roomId}.svg`} />

            <div className='chatHeaderInfo'>
                <h3>{roomName}</h3>
                
                <p>Last seen at{new Date(messages[messages.length - 1]
                ?.timestamp?.toDate()).toUTCString()}</p>

            </div>

            <div className='chatHeaderRight'>
        <IconButton >
         <DonutLargeIcon />
        </IconButton>

        <IconButton>
        <ChatIcon />
        </IconButton>

        <IconButton>
        <MoreVertIcon />
        </IconButton>
            </div>
        </div>

        {/* chat body */}

        <div className='chat__chatBody'>
        {messages.map(message => 
        (
            <p key={message.name} className={`chat__chatMessage ${message.name === user.displayName && 'chat__receiver'}`}>
            <span className='chat__name' >{message.name}</span>
            {message.message}
            <span className='chat__timestamp'>{new Date(message.timestamp?.toDate()).toUTCString()}</span>
            </p>
        ))}
        </div>

        {/* chat footer */}
        <div className='chat__footer'>
        <IconButton>
        <InsertEmoticonIcon />
        </IconButton> 

        <IconButton>
        <AttachFileIcon />            
        </IconButton>
            <form >
            <input  
            type='text'
            placeholder='Type a message'
            value={inputValue}
            onChange={setInputHandler} />
            <button 
            type='submit'
            onClick={sendMessage}
            >Send </button>
            </form>

         <IconButton>
         <MicIcon/>       
        </IconButton>    
         
        </div>

        </div>
    )
}

export default Chat;