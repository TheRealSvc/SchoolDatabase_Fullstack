import React, { Component } from 'react';  
import { withRouter } from "react-router";
import { Link} from "react-router-dom";
import { Consumer } from './Context';
import FormValidation from './FormValidation' ;

const axios = require('axios');


class UserSignUp extends Component { 

    constructor(props) {
        super(props);
        this.state = {firstName: '', lastName: '', emailAddress: '', password: '', confirmPassword: ''};
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this); 
        this.handleInputChange = this.handleInputChange.bind(this);     
    }

    handleCancel = (e) => {
        e.preventDefault();
        this.props.history.push("/");
      }
      
      handleSignUp = ( e, loggedPassword) => {
        const {firstName, lastName , emailAddress, password, confirmPassword} = this.state;
        const { history } = this.props ;
        e.preventDefault();
        console.log(`Hallo ich bin in handleUpdate in signUp. firstName:  ${firstName}`)
        const { location} = this.props ;
        //console.log(`password is ${password} and location is ${location.pathname.slice(0, -7)}` );
        
        if (password===confirmPassword) {

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
                .then( this.props.history.push('/') )
                .catch(function (error) {
                console.log(error);
                });
            }
    }

    handleInputChange = (e) => {
      e.preventDefault();
      console.log(`state: ${e.target.name}, ${e.target.value}`);
      this.setState({[e.target.name]: e.target.value }, () => { console.log(this.state) });
    }


    render() {  
    return(
        <Consumer>
        { ({ actions, logged }) => (
       <div>
        <main>
        <div className="form--centered">
          <h2>Sign Up</h2>
          <FormValidation Firstname={this.state.firstName} Lastname={this.state.lastName} Email={this.state.emailAddress} Password={this.state.password} PasswordConfirm={this.state.confirmPassword} /> 
          <form>
            <label htmlFor="firstName">First Name</label>
            <input id="firstName" name="firstName" type="text" value={this.state.firstName} onChange={this.handleInputChange} />
            <label htmlFor="lastName">Last Name</label>
            <input id="lastName" name="lastName" type="text" value={this.state.lastName} onChange={this.handleInputChange} />
            <label htmlFor="emailAddress">Email Address</label>
            <input id="emailAddress" name="emailAddress" type="email" value={this.state.emailAddress} onChange={this.handleInputChange} />
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" value={this.state.password} onChange={this.handleInputChange} />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input id="confirmPassword" name="confirmPassword" type="password" value={this.state.confirmPassword} onChange={this.handleInputChange} />
            <button className="button" type="submit" onClick={ e => this.handleSignUp(e,logged[0].password) }>Sign Up</button>
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
