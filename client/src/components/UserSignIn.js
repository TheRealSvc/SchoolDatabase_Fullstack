import { render } from '@testing-library/react';
import React, { Component } from 'react'; 
import { withRouter , Redirect} from "react-router";
import { Consumer } from './Context';
const util = require('util');

class UserSignIn extends Component { 

  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
    }
    
  handleCancel = (e) => {
      e.preventDefault();
      this.props.history.push("/");
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
                        console.log(`location.state is ${this.props.location.state}`);  
                        const { from } = this.props.location.state || { from:  {pathname: '/'}} ;
                        actions.signIn(e, document.querySelector('#emailAddress'), document.querySelector('#password'))
                        .then(() => {this.props.history.push(from)}) ;
                      }}
                       >
                        <label htmlFor="emailAddress">Email Address</label>
                        <input id="emailAddress" name="emailAddress" type="email" defaultValue="" />
                        <input id="password" name="password" type="password" defaultValue="" />
                        <button className="button" type="submit" onClick={ e => {
                         // console.log(`location.state is ${this.props.location.state}`);  
                        const { from } = this.props.location.state || { from:  {pathname: '/'}} ;
                        actions.signIn(e, document.querySelector('#emailAddress'), document.querySelector('#password'))
                        .then(() => {this.props.history.push(from)}) ;
                      }}
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