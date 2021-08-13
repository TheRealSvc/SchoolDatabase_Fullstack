// Context for maintaining a global authentication-state is created in this separate file   
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Cookies from "js-cookie";
const AuthContext = React.createContext();
const axios = require('axios');

/**
 * The provisioning of context to be accessed from all other components
 * It is designed to only hold information about the logged-in user. Nothing else. 
 */
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
          } else {   //otherwise use cookie information
            this.state = {
              logged: authUser
            }
            console.log(`cookie was used to signIn user ${this.state.logged}`) ;
          }
        };
  
       
componentDidMount() {}

/**
 * signIn method is called from other components to signIn an existing user.
 * A cookie is used to improve the user experience by storing login information in the browser until signOut is called 
 * or the cookie-expiration time is overdue  
 */
signIn = async (e, name, password) => {
    console.log(name,password);
    
    e.preventDefault();
    /*
    let empty = "" ;
   
    if (!name || !password) { 
     empty = "missing data !" 
     this.setState({empty: empty}) ;
    } ; */
  
    if (name !== this.state.logged[0].email) {
      const authHeader = `Basic ${window.btoa(name.value+":"+password.value)}`  
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
        if(response.status===200) {
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
          //this.props.history.push("/error")
        })
    }}
    
    /**
     * signOut resets context state 
     */
    signOut = () => {
        this.setState({ logged: [{
            status: "notauthenticated",
            email: "",
            password: "",
            firstname: "",
            lastname: "",
            userid: null,
            empty: "",
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