import React, {useState, useEffect} from 'react'

import Database from '../../../firebase';
import { Avatar } from '@material-ui/core';
import './SidebarChat.css';
import { Link } from 'react-router-dom';

const SidebarChat = (props) => {

     const [seed, setSeed] = useState(); 
     const [messages, setMessages] = useState([])

     useEffect(() => {
         if(props.id){
             Database.collection('rooms')
            .doc(props.id)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => setMessages(snapshot.docs.map(doc => 
            doc.data())) )

         }
         
     }, [props.id])

     useEffect(() => {
        setSeed(Math.floor(Math.random() * 500));
     }, []);

     const createChat = () => {
         const roomName = prompt("Enter name for Chat");

         if(roomName){
            Database.collection('rooms').add({
                name: roomName
            })
         }
     }



     return !props.addNewChat ? (
         <Link to={`/rooms/${props.id}`}>
        <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`} />
            <div className="sidebarChat__info">
            <h2 className="info__roomName" >{props.name}</h2>
            <p>{messages[0]?.message}</p>
            </div>
        </div>
         </Link>
    ) : (
    <div onClick={createChat}  className="sidebarChat">    
    <h2>Add new Chat</h2>
    </div>
    )
};

export default SidebarChat;