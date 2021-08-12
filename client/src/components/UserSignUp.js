import React, { Component } from 'react';  
import { Link} from "react-router-dom";
import { Consumer } from './Context';
import FormValidation from './FormValidation' ;
const axios = require('axios');


/**
 * UserSignUp renders a signUp screen 
 */
class UserSignUp extends Component { 

    constructor(props) {
        super(props);
        this.state = {firstName: '', lastName: '', emailAddress: '', password: '', confirmPassword: '', valErrors: ''};
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this); 
        this.handleInputChange = this.handleInputChange.bind(this);     
    }

    //handleCancel just redirects to the courses page
    handleCancel = (e) => {
        e.preventDefault();
        this.props.history.push("/");
      }
      
    /**
     * calls the api at url http://localhost:5000/api/users to create a new user 
     * cb is the signIn callback to be executed immediately after successfull signUp 
     */  
    handleSignUp = (e, cb) => {
      const { history } = this.props ;
      e.preventDefault();
      console.log(`Hallo ich bin in handleUpdate in signUp. firstName:  ${this.state.firstName}`)
      const { location} = this.props ;
      
      if (this.state.password===this.state.confirmPassword) {
          var data = JSON.stringify({
              "firstName": this.state.firstName,
              "lastName": this.state.lastName,
              "emailAddress": this.state.emailAddress,
              "password": this.state.password
          });
      
          var config = {
              method: 'post',
              url: 'http://localhost:5000/api/users',
              headers: { 
              'Content-Type': 'application/json', 
              'Authorization': this.state.password
              },
              data : data
          };
          axios(config)
              .then(function (response) {
              console.log(JSON.stringify(response.data));
              })
              .then( x => {
                console.log(`now signIn should be triggered. Email is: ${this.state.emailAddress}`) 
                cb(e, document.querySelector('#emailAddress'), document.querySelector('#password'));
                this.props.history.push('/');
                })
                .catch( error => {
                  console.log(`UserSignUp error: ${JSON.stringify(error.response.data.errors)}`);
                  this.setState({ 
                    valErrors: error.response.data.errors })
                });
          }
  }

 // generalized handling of user Input 
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
          <FormValidation  ApiError={this.state.valErrors} /> 
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
            <button className="button" type="submit" onClick={ e => this.handleSignUp(e, actions.signIn) }>Sign Up</button>
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
