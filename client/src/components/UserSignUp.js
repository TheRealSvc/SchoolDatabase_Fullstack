import React, { Component } from 'react';  
import { withRouter } from "react-router";
import { Link} from "react-router-dom";
import { Consumer } from './Context';


const axios = require('axios');


class UserSignUp extends Component { 

    constructor(props) {
        super(props);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);    
    }

    handleCancel = (e) => {
        e.preventDefault();
        this.props.history.push("/");
      }
      
      handleSignUp = (e,firstName, lastName, emailAddress, password, passwordConfirm, loggedPassword) => {
        const { history } = this.props ;
        e.preventDefault();
        console.log(`Hallo ich bin in handleUpdate in signUp. firstName:  ${firstName}`)
        const { location} = this.props ;
        console.log(`password is ${password} and location is ${location.pathname.slice(0, -7)}` );
        
        if (password===passwordConfirm) {

            var data = JSON.stringify({
                "firstName": firstName,
                "lastName": lastName,
                "emailAddress": emailAddress,
                "password": password
            });
            
            console.log(data);

            var config = {
                method: 'post',
                url: 'http://localhost:5000/api/users',
                headers: { 
                'Content-Type': 'application/json', 
                'Authorization': loggedPassword
                },
                data : data
            };
            axios(config)
                .then(function (response) {
                console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                console.log(error);
                });
            }
}

    render() {  
    return(
        <Consumer>
        { ({ actions, logged }) => (
       <div>
        <main>
        <div className="form--centered">
          <h2>Sign Up</h2>
          <form>
            <label htmlFor="firstName">First Name</label>
            <input id="firstName" name="firstName" type="text" defaultValue="" />
            <label htmlFor="lastName">Last Name</label>
            <input id="lastName" name="lastName" type="text" defaultValue="" />
            <label htmlFor="emailAddress">Email Address</label>
            <input id="emailAddress" name="emailAddress" type="email" defaultValue="" />
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" defaultValue="" />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input id="confirmPassword" name="confirmPassword" type="password" defaultValue="" />
            <button className="button" type="submit" onClick={ e => this.handleSignUp(e, document.querySelector("#firstName").value,document.querySelector("#lastName").value,document.querySelector("#emailAddress").value, document.querySelector("#password").value,document.querySelector("#confirmPassword").value, logged[0].password) }>Sign Up</button>
            <button className="button button-secondary" onClick={ e => this.handleCancel(e) }>Cancel</button>
          </form>
          <p>Already have a user account? <Link to="/signin">Click here to </Link> sign in !</p>
        </div>
      </main>
      </div>
            )}
          </Consumer>
           )}
      }

export default UserSignUp;
