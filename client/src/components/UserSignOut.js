import React from 'react';
import { Consumer } from './Context';
import { Redirect } from 'react-router-dom';
import { useContext , useEffect} from 'react';

/**
* signs a user out by calling the "context function" signOut 
*/
const UserSignOut = () => {
    const { actions } = useContext(Consumer); 
    useEffect(() => actions.signOut());
    return <Redirect to='/' />;
    }
  
export default UserSignOut;

