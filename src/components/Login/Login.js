import React from 'react';

import './Login.css';
import {Button} from '@material-ui/core';
import {auth, provider} from '../../firebase';
import {useStateValue} from '../../StateProvider';

const Login = (props) => {

    const [ {user} , dispatch ] =  useStateValue();


    const signIn = () => {
        auth
        .signInWithPopup(provider)
        .then(result => dispatch({
            type: 'SET_USER',
            user: result.user
        }))
        .catch(err => alert(err.message));
    };

    return (
        <div className='login'>
            <div className='login__container' >
                <img
                className='login__img'
                src='https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg'
                alt='what"s app Logo'
                />
                <div className='login__text'>
                    <h1>sign in to WhatsApp</h1>
                </div>

                <Button onClick={signIn} > Sign in With google</Button>
            </div>
        </div>
    )
}

export default Login;