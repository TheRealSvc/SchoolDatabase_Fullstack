import { render } from '@testing-library/react';
import React, { Component } from 'react'; 
import { withRouter , Redirect} from "react-router";
import { Consumer } from './Context';
import Cookies from 'js-cookie';
import { SSL_OP_EPHEMERAL_RSA } from 'constants';
const util = require('util');

class UserSignIn extends Component { 

  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
    this.sleep = this.sleep.bind(this);
    }
    
  handleCancel = (e) => {
      e.preventDefault();
      this.props.history.push("/");
    }
    
  sleep = async (e,actions) => {
      return await actions.signIn(e, document.querySelector('#emailAddress'), document.querySelector('#password')) ;
    } 

         render() {
           return(   
             
            <Consumer>
               { ({ actions, logged }) => (
              <div>
                  <main>
                    <div className="form--centered">
                      <h2>Sign In</h2>
                      <form id="signinform" onSubmit={ e => { 
                        actions.signIn(e, document.querySelector('#emailAddress'), document.querySelector('#password')) ;
                        this.props.history.push("/")}
                      }
                       >
                        <label htmlFor="emailAddress">Email Address</label>
                        <input id="emailAddress" name="emailAddress" type="email" defaultValue="" />
                        <input id="password" name="password" type="password" defaultValue="" />
                        <button className="button" type="submit" onClick={ e => {  
                        actions.signIn(e, document.querySelector('#emailAddress'), document.querySelector('#password')) ;
                        this.props.history.push("/") }}
                         > Sign In </button> 
                        <button className="button button-secondary" onClick={ e => this.handleCancel(e) } > Cancel </button>
                      </form>
                      <p> Don't have a user account? Click here to <a href="/signout">sign up</a>!</p> 
                    </div>
                  </main>
              </div>
            )}
          </Consumer>
           )}
      }

export default withRouter(UserSignIn);
