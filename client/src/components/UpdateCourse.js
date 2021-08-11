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
        this.state = {courseTitle: '', id: '', materialsNeeded: '', courseDescription: '', estimatedTime: '', userId: '', userEmail: '', userFirstName:'',userLastName: ''}
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);     
    };
    
  
    getIdfromPath = () =>  {
      let pathy=this.props.location.pathname.split("/") ; 
      let pathid = pathy[pathy.length-1] ;
      return pathid ;
    };  

  getCourse = () =>  {
    console.log("updateCourses called after componentDidMount")
    const { location, history, match} = this.props ;
    const options = {
      headers: new Headers({'content-type': 'application/json'}),
    };

    fetch(`http://localhost:5000/api/courses/${match.params.id}`) //here i could also use props... 
    .then(res => { console.log(`${this.props.match.params.id}`) ;
      if(res.status===200)  { 
       res.json().then(
        course => {   
          console.log(`User.id  ${course.User.id}`);
      this.setState({
        id: course.id,
        courseTitle: course.title,
        materialsNeeded: course.materialsNeeded,
        courseDescription: course.description,
        estimatedTime: course.estimatedTime,
        userId: course.User.id,
        userEmail: course.User.emailAddress,
        userFirstName: course.User.firstName, 
        userLastName: course.User.lastName,
      }, x => { console.log(`in CourseDetails new state courseId is ${this.state.courseId} and ${this.getIdfromPath()} `);
    }) 
}) 
.catch(error => {
this.props.history.push("/notfound");
}) //res.json Promise err handling
} else {
const httpStatus = res.status;
res.json().then(result => {
const { message } = result;
console.log('API returned status', httpStatus, 'with error message', message);
this.props.history.push("/notfound");  
});
}
})
.catch(error => {
// console.log(`in fetch catch:`);  
this.props.history.push("/error") 
}); // fetch Promise err handling
}



handleUpdate = (e,password) => {
    //const {courseTitle, courseDescription} = this.state ;
    const { history } = this.props ;
    e.preventDefault();
    const { location} = this.props ;
    console.log(`password is ${password} and location is ${location.pathname.slice(0, -7)}`);
    var data = JSON.stringify({
      "id": this.state.id,
      "title": this.state.courseTitle,
      "description": this.state.courseDescription,
      "userId": this.state.userId,
      "materialsNeeded": this.state.materialsNeeded,
      "estimatedTime": this.state.estimatedTime,
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
              <textarea id="materialsNeeded" name="materialsNeeded"  value={this.state.materialsNeeded} onChange={this.handleInputChange} />
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
