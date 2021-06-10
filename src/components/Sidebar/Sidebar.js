import React, { useState, useEffect } from 'react'

import classes from './Sidebar.module.css';
import Database from '../../firebase';


import {Avatar,IconButton} from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';

import SidebarChat from './SidebarChat/SidebarChat';

const Sidebar = (props) => {

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
     const unsubscribe =   Database.collection("rooms").onSnapshot((snapShot) =>
        setRooms(
            snapShot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }))
        ) 
        )
    return () => {
        unsubscribe();
    }    
      
    }, [])


    return (
        <div className={classes.sidebar}>

        {/* header */}
        <div className={classes.header}>

        <Avatar 
        src="https://web.whatsapp.com/pp?e=https%3A%2F%2Fpps.whatsapp.net%2Fv%2Ft61.24694-24%2F117387704_751319515661560_6274346652394250367_n.jpg%3Foh%3D8b0240d8451006f283b3a2a665a29d9b%26oe%3D6009C65E&t=l&u=919810896720%40c.us&i=1596708654&n=fBZ3at36o5BwJyMMw1m7HHVtpav5IpZ5uTxdmZIcC6k%3D"
        />
        <div className={classes.headerRight}>

        <IconButton className={classes.icon} >
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



        {/* search */}
        <div className={classes.search}>

        <div className={classes.searchContainer}>
        <SearchIcon style={{"marginLeft":"10px", "color":"gray"}}  />
        <input className={classes.input} placeholder="Search or Start new chat" type="text" />
        </div>
        
        </div>



        {/* chats */}
        <div className={classes.chats}>
            <SidebarChat addNewChat />
            {rooms.map(room => 
            <SidebarChat 
            key={room.id}
            id={room.id}
            name={room.data.name}  />
            )}

        </div>


        </div>
    )
}

export default Sidebar;