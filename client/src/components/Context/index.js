  
/*
Context for maintaining a global authentication-state is created in this separate file   
*/
/*import React from 'react';
const AuthenticationContext = React.createContext() ;
export const Provider = AuthenticationContext.Provider ;
export const Consumer = AuthenticationContext.Consumer ;
*/
import React, { Component } from 'react';
import { withRouter, Route ,Link } from "react-router-dom";
import Cookies from "js-cookie";

const AuthContext = React.createContext();
const axios = require('axios');

export class Provider extends Component {

    constructor(props) {
        super(props);
        let authUser = [JSON.parse(Cookies.get("logged"))] || false ;
        //console.log(`testtest... ${authUser} of type ${typeof(authUser)} and ${Object.entries(authUser)}`);
        if (isFinite(authUser) || !authUser) {   // if no cookie about the authenticated user is stored initialize empty "logged-state"
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
        this.handleLoggedIn =this.handleLoggedIn.bind(this);        
        };
  
handleLoggedIn = (x) => {
   // const form = document.getElementById("signinform") ;
   // form.reset() ;
}    

componentDidMount() {
 // this.signIn();
}

// called in UserSignIn 
signIn = async (e, name, password) => {
    console.log(name,password);
    e.preventDefault();
    const form = document.getElementById("signinform");
    console.log(`in Sign In: name Input= ${name.value} and state.email= ${this.state.logged[0].email} `);
    console.log(`in Sign In: password= ${password.value}`);
    console.log(`in Sign In: logged ${this.state.logged[0]}`);
    
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
      .catch( error => {
        this.setState({ 
          state: "authfailed"
        }, x => {form.reset(); alert('Your credentials were wrong. Please try again.')})
      });
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