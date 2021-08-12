import React, { Component } from 'react'; 
import {withRouter} from 'react-router'; // required for accessing the location prop 
import { Consumer } from './Context';
import FormValidation from './FormValidation' ;
const axios = require('axios');

/**
 * Create course componenent renders a CreateCourse screen. 
 * If no user is signed-in a redirect to the signIn happens.
 * Form Validation is displayed based on the API output.  
 */
class CreateCourse extends Component { 
      
      constructor(props) {
        super(props);
        this.state = {courseTitle: '', courseDescription: '', valErrors: '' };
        this.handleCancel = this.handleCancel.bind(this);
        this.handleCreateCourse = this.handleCreateCourse.bind(this);
        this.handleInputChange =  this.handleInputChange.bind(this);      
        };

      componentDidUpdate() {
       // const { location } = this.props ;
        }

      handleCancel = (e) => {
        e.preventDefault();
        this.props.history.push("/");
      }

      handleCreateCourse = (e, userId, password, title, description, estTime, matNeeded) => {
        const { history } = this.props ;
        e.preventDefault();  
        var data = JSON.stringify({
            "title": title,
            "description": description,
            "userId": userId, 
            "estimatedTime": estTime,
            "materialsNeeded": matNeeded, 
          });
          var config = {
            method: 'post',
            url: 'http://localhost:5000/api/courses',
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': password
            },
            data : data
          };
        
        axios(config)
          .then( response => {
            console.log(JSON.stringify(response.data));
            history.push('/') ;
          })
          .catch( error => {
           console.log(`hallo Du da: ${JSON.stringify(error.response.data.errors)}`);
            this.setState({ 
              valErrors: error.response.data.errors })
          });
  }
  
    /**
     * handleInputChange: handles  
     */  
    handleInputChange = (e) => {
      e.preventDefault();
      this.setState({[e.target.name]: e.target.value });
    }

    render() {
        return (
          <Consumer>
          { ({ actions, logged }) => (
            <div>
                <main>
                    <div className="wrap">
                        <h2>Create Course</h2>
                        <FormValidation  ApiError={this.state.valErrors} /> 
                 <form>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" value={this.state.courseTitle} onChange={this.handleInputChange}  type="text" />
                            <p>By {logged[0].firstname} {logged[0].lastname}</p>
                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" value={this.state.courseDescription} onChange={this.handleInputChange}></textarea>
                        </div>

                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" defaultValue="" />
                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded"></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit" onClick={e => this.handleCreateCourse(e,logged[0].userid,logged[0].password,
                        document.querySelector("#courseTitle").value, document.querySelector("#courseDescription").value,
                        document.querySelector("#estimatedTime").value,document.querySelector("#materialsNeeded").value)} >Create Course</button>
                    <button className="button button-secondary" onClick={e => {this.handleCancel(e)}} >Cancel</button>
                 </form>
                </div>
                </main>
            </div>
      )}
        </Consumer>
    );
    }
    }

export default withRouter(CreateCourse);