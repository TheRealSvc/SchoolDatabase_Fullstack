import React, { Component} from 'react'; 
import {withRouter} from 'react-router'; // required for accessing the location prop 
import { Consumer } from './Context';
import PropTypes from 'prop-types';
import FormValidation from './FormValidation' ;
let axios = require('axios');

/**
 * Updates an existing course
 * Form validation is based on the api result 
 */
class UpdateCourse extends Component { 
  static propTypes = {
      location: PropTypes.object.isRequired
    }

    constructor(props) {
      super(props);
      this.state = {courseTitle: '', id: '', materialsNeeded: '', courseDescription: '', estimatedTime: '', userId: '',
        userEmail: '', userFirstName:'',userLastName: '', valErrors: '' }
      this.handleUpdate = this.handleUpdate.bind(this);
      this.getCourse = this.getCourse.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);     
    };
  
  /** 
  * Here course data is fetched from http://localhost:5000/api/courses/:id  
  * Error handling resdirecting to /notfound and /error page in case of error
   */
  getCourse = (loggedUserId) =>  {
    const { history, match} = this.props ;
    //console.log(`updateCourses called after componentDidMount with courseId a: ${match.params.id}, b: ${this.state.userId}, c: ${loggedUserId}`);
      fetch(`http://localhost:5000/api/courses/${match.params.id}`) 
      .then(res => { 
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
              }, x => { if (this.state.userId!==loggedUserId) { this.props.history.push("/forbidden") } } )
            })  
          .catch(error => {
            error.response.status===403 ? history.push('/forbidden') : this.props.history.push("/error") 
          }) 
        } else {
            const httpStatus = res.status;
            res.json().then(result => {
              const { message } = result;
              console.log('API returned status', httpStatus, 'with error message', message);
              this.props.history.push("/notfound");  
            })
        }
      })
      .catch(error => {
        error.response.status===403 ? history.push('/forbidden') : this.props.history.push("/error") 
      })
    }


  /**  
  * handleUpdate: callback function for updating course data
  * Form Validation is based on API response  
  */
  handleUpdate = (e,password) => {
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
          } else if (response.status===401) { history.push('/forbidden') } 
        })  // update page
      .then( response => {
        history.push('/') ;
      })
    .catch( (error) => {
      error.response.status===403 ? history.push('/forbidden') : this.setState({ 
        valErrors: error.response.data.errors })  
    }); 
  }

  componentDidMount() { 
    this.getCourse(this.props.logged.userid) 
  }


  // handles input change in a generalized way
  handleInputChange = (e) => {
    e.preventDefault();
    console.log(`state: ${e.target.name}, ${e.target.value}`);
    this.setState({[e.target.name]: e.target.value }, () => { console.log(this.state) });
  }

  // after hitting Cancel a redirect to the corresponding courseDetail page is done
  handleCancel = (e) => {
    e.preventDefault();
    console.log(`after pressing cancel: ${this.props.match.params.id}`) ;
    this.props.history.push(`/courses/${this.props.match.params.id}`);
  }

    render() {  
    return(
     <Consumer>
        { ({ logged }) => (   
        <div className="wrap">
            <h2>Update Course</h2>
            <FormValidation ApiError={this.state.valErrors} /> 
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
    )
  }
}

export default withRouter(UpdateCourse);
