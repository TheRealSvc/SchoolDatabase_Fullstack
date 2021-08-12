import React, { useContext } from "react";
import { Consumer } from '../components/Context';
import { withRouter } from "react-router";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";


/** A wrapper for <Route> that redirects to the login-screen if you're not yet authenticated.
* Otherwise renders the component directly
*/ 
function PrivateRoute({component: Children, ...rest }) {
    const { logged } = useContext(Consumer);
    console.log(`okay, this is the PrivateRoute Component with auth stat ${logged[0].status}`);
    return (
      <Route
        {...rest}
        render={ props =>
          logged[0].status==="authenticated" ? (   
            <Children {...props}/>  
          ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: props.location },
              }}
            /> 
          )
        }
      />
    );
  }
  
export default withRouter(PrivateRoute);

