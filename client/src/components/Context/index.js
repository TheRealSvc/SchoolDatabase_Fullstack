  
/*
Context for maintaining a global authentication-state is created in this separate file   
*/
/*import React from 'react';
const AuthenticationContext = React.createContext() ;
export const Provider = AuthenticationContext.Provider ;
export const Consumer = AuthenticationContext.Consumer ;
*/
import React, { Component } from 'react';
import { withRouter, Route, Link } from "react-router-dom";
import Cookies from "js-cookie";

const AuthContext = React.createContext();
const axios = require('axios');

export class Provider extends Component {
    constructor(props) {

      /* little helper to ensure the state data can be parsed */
      const testjson = function(x) { 
          try {
            JSON.parse(x);
            return true;
          } catch {
            return false;
          }
        };
        super(props);

        let authUser = false ;
        if(testjson(Cookies.get("logged"))) {
          authUser = [JSON.parse(Cookies.get("logged"))]
        }
        
        //console.log(`testtest... ${authUser} of type ${typeof(authUser)} and ${Object.entries(authUser)}`);
        if ( !authUser ) {   // if no cookie about the authenticated user is stored initialize empty "logged-state"
          this.state = {
            logged: [{
                status: "",
                email: "",
                password: "",
                firstname: "",
                lastname: "",
                userid: null,
            }]
            };
            console.log("initialization with empty user (no cookie)") ;
          } else {   //otherwise use cookie information
            this.state = {
              logged: authUser
            }
            console.log(`cookie was used to signIn user ${this.state.logged}`) ;
          }
        };
  
       
componentDidMount() {}

// called in UserSignIn 
signIn = async (e, name, password) => {
    console.log(name,password);
    e.preventDefault();
    const form = document.getElementById("signinform");
    
    if (name !== this.state.logged[0].email) {
      const authHeader = `Basic ${window.btoa(name.value+":"+password.value)}` 
      console.log(authHeader)   
      let config = {
       method: 'get',
       url: 'http://localhost:5000/api/users',
        headers: { 
          'Authorization': authHeader
        }
      };    

      await axios(config)
      .then( response => {
        console.log(JSON.stringify(response.data));
        if(response.status==200) {
            this.setState({ logged: [{
                status: "authenticated",
                email: name.value,
                password: authHeader,
                firstname: response.data.firstName,
                lastname:  response.data.lastName,
                userid: response.data.id,
                }]    
             }, x => { console.log(`You are logged in ${this.state.logged[0].firstname} ${this.state.logged[0].lastname}`); 
              Cookies.set("logged", JSON.stringify(this.state.logged[0]), { expires: 10 })  }
             )
            }
         }
        )  
        .catch((error) => {console.log(error);
          this.props.history.push("/error")})
    }}
    
    signOut = () => {
        this.setState({ logged: [{
            status: "notauthenticated",
            email: "",
            password: "",
            firstname: "",
            lastname: "",
            userid: null,
            }]    
         }, x => { console.log(this.state.logged) });
         Cookies.remove("logged"); 
    }

  render() {
    return (
      <AuthContext.Provider value={{
        logged: this.state.logged,
        actions: {
          signIn: this.signIn,
          signOut: this.signOut,
        }
      }}>
        { this.props.children }
      </AuthContext.Provider> 
    )
  }  
}

export const Consumer = withRouter(AuthContext.Consumer);