import React, { Component } from 'react'; 
import PropTypes from 'prop-types';
import {withRouter} from 'react-router'; // required for accessing the location prop 
import { Consumer } from './Context';
const axios = require('axios');

class CreateCourse extends Component { 
    static propTypes = {
        location: PropTypes.object.isRequired
      }

      constructor(props) {
        super(props);
        this.state = {title: '', courseId: '', material: '', description: '', estimatedTime: '', userId: '', userEmail: '', userFirstName:'',userLastName: ''}
        this.handleCancel = this.handleCancel.bind(this);
        this.handleCreateCourse = this.handleCreateCourse.bind(this);
        };

      componentDidUpdate() {
        const { location } = this.props ;
        }

      handleCancel = (e) => {
        e.preventDefault();
        this.props.history.push("/");
      }

      handleCreateCourse = (e, userId, password,title, description, estTime, matNeeded) => {
        //const { history } = this.props ;
        e.preventDefault();
        console.log(`Hallo ich bin in handleCreateCourse in CreateCourses. The password ${password} ans userIf ${userId}`)
        //const { location} = this.props ;

        var data = JSON.stringify({
            "title": title,
            "description": description,
            "userId": userId, 
            "estimatedTime": estTime,
            "materialsNeeded": matNeeded, 
          });
          console.log(data);  
          var config = {
            method: 'post',
            url: 'localhost:5000/api/courses',
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': password
            },
            data : data
          };
        
        axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            this.props.history.push('/') 
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    
    render() {
        return (
          <Consumer>
          { ({ actions, logged }) => (
            <div>
                <main>
                    <div class="wrap">
                        <h2>Create Course</h2>
                        <div class="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul>
                            <li>Please provide a value for "Title"</li>
                            <li>Please provide a value for "Description"</li>
                        </ul>
                    </div>
                 <form>
                    <div class="main--flex">
                        <div>
                            <label for="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" defaultValue="" />
                            <p>By {logged[0].firstname} {logged[0].lastname}</p>
                            <label for="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription"></textarea>
                        </div>

                        <div>
                            <label for="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" defaultValue="" />
                            <label for="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded"></textarea>
                        </div>
                    </div>
                    <button class="button" type="submit" onClick={e => this.handleCreateCourse(e,logged[0].userid,logged[0].password,
                        document.querySelector("#courseTitle").value, document.querySelector("#courseDescription").value,
                        document.querySelector("#estimatedTime").value,document.querySelector("#materialsNeeded").value)} >Create Course</button>
                    <button class="button button-secondary" onClick={e => {this.handleCancel(e)}} >Cancel</button>
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