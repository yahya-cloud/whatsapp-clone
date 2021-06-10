import React, {useState} from 'react';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import classes from './App.module.css';
import Chat from './components/Chat/Chat';
import Login from './components/Login/Login';
import Sidebar from './components/Sidebar/Sidebar';
import {useStateValue} from './StateProvider';

function App() {

  const [ {user} , dispatch ] =  useStateValue();


  return (
    <div className={classes.app}>

    {!user ? <Login />
    :
    <div className={classes.app_body}>
    <Router>
    <Sidebar />


    <Switch>

    <Route path='/rooms/:roomId'>
    <Chat />    
    </Route>

    <Route path='/'>
    
    </Route>
    
    </Switch>
    </Router>
  
    </div>}

    </div>
  );
}

export default App;
