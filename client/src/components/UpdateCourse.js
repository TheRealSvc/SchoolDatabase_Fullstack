import React, { Component } from 'react'; 
import {withRouter} from 'react-router'; // required for accessing the location prop 
import { Consumer } from './Context';
import PropTypes from 'prop-types';
import FormValidation from './FormValidation' ;


let axios = require('axios');


class UpdateCourse extends Component { 
    static propTypes = {
        location: PropTypes.object.isRequired
      }
      constructor(props) {
        super(props);
        this.state = {courseTitle: '', courseId: '', material: '', courseDescription: '', estimatedTime: '', userId: '', userEmail: '', userFirstName:'',userLastName: ''}
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);     
    };
    

  getCourse = () =>  {
    const { location} = this.props ;
    console.log(`location.pathname in updateCourse Fun (UpdateCourse Component) is: ${location.pathname}`);
    const options = {
      headers: new Headers({'content-type': 'application/json'}),
    };
    const  course = fetch(`http://localhost:5000/api/${location.pathname.slice(0, -7) }`, options) // removing the update part of the path
    .then( x => x.json())
    .then( x => { 
     // console.log(`State did change in UpdateCourse: path: ${location.pathname}, new: ${x.id}`) ;
      this.setState({
        courseId: x.id,
        courseTitle: x.title,
        material: x.materialsNeeded,
        courseDescription: x.description,
        estimatedTime: x.estimatedTime,
        userId: x.User.id,
        userEmail: x.User.emailAddress,
        userFirstName: x.User.firstName, 
        userLastName: x.User.lastName,
    }, x => {console.log(`in UpdateCourse new state email is ${this.state.userEmail}`)})
    }) 
    .catch( 'error in fetching courses') 
  };
 

handleUpdate = (e,password) => {
    const {courseTitle, courseDescription} = this.state ;
    const { history } = this.props ;
    e.preventDefault();
    console.log(`Hallo ich bin in handleUpdate in UpdateCourses. The title ${courseTitle}`);
    const { location} = this.props ;
    console.log(`password is ${password} and location is ${location.pathname.slice(0, -7)}`);
    var data = JSON.stringify({
      "id": this.state.courseId,
      "title": courseTitle,
      "description": courseDescription,
      "userId": this.state.userId,
    });
    console.log(data);
    var config = {
      method: 'put',
      url: `http://localhost:5000/api${location.pathname.slice(0, -7)}`,
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': password
      },
      data : data
    };
    
    axios(config)
    .then( response => { if(response.status===204) { console.log("status 204") ;
        } else if(response.status===401) { history.push('/forbidden') } 
      })  // update page
    .then( response => {
      history.push('/') ;
    })
    .catch(function (error) {
      history.push('/forbidden');  
      console.log(error);
    }); 
}

  componentDidMount() {
    console.log("componentDdMound called in UpdateCourse")
    this.getCourse() ;
  } 

  handleInputChange = (e) => {
    e.preventDefault();
    console.log(`state: ${e.target.name}, ${e.target.value}`);
    this.setState({[e.target.name]: e.target.value }, () => { console.log(this.state) });
  }

  handleCancel = (e) => {
    e.preventDefault();
    this.props.history.push("/");
 }

    render() {  
    return(
     <Consumer>
        { ({ actions, logged }) => (
    <div className="wrap">
        <h2>Update Course</h2>
        <FormValidation Title={this.state.courseTitle} Description={this.state.courseDescription} /> 
        <form>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input id="courseTitle" name="courseTitle" type="text" value={this.state.courseTitle} onChange={this.handleInputChange} />
              <p> By {this.state.userFirstName} {this.state.userLastName} </p>
              <label htmlFor="courseDescription">Course Description</label>
              <textarea id="courseDescription" name="courseDescription" value={this.state.courseDescription} onChange={this.handleInputChange} />
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input id="estimatedTime" name="estimatedTime" type="text"  value={this.state.estimatedTime} onChange={this.handleInputChange} />
              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea id="materialsNeeded" name="materialsNeeded"  value={this.state.material} onChange={this.handleInputChange} />
            </div>
          </div>
          <button className="button" type="submit" onClick={ e => this.handleUpdate(e,logged[0].password) } >Update Course</button>
          <button className="button button-secondary" onClick={e => this.handleCancel(e)} >Cancel</button>
        </form>
      </div>
        )}
    </Consumer>
    );
  }
}
export default withRouter(UpdateCourse);
