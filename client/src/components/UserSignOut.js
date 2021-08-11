import React from 'react';
import { Consumer } from './Context';
import { Redirect } from 'react-router-dom';
import { useContext } from 'react';

const UserSignOut = () => {
    const { actions } = useContext(Consumer);
    actions.signOut();
    return <Redirect to='/' />;
    }
  
export default UserSignOut;
