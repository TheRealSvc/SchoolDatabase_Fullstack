import React, { Component } from 'react'; 
import {withRouter} from 'react-router'; // required for accessing the location prop 
import { Consumer } from './Context';
import PropTypes from 'prop-types';
const axios = require('axios');


class UpdateCourse extends Component { 
    static propTypes = {
        location: PropTypes.object.isRequired
      }
      constructor(props) {
        super(props);
        this.state = {title: '', courseId: '', material: '', description: '', estimatedTime: '', userId: '', userEmail: '', userFirstName:'',userLastName: ''}
        this.handleUpdate = this.handleUpdate.bind(this);
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
        title: x.title,
        material: x.materialsNeeded,
        description: x.description,
        estimatedTime: x.estimatedTime,
        userId: x.User.id,
        userEmail: x.User.emailAddress,
        userFirstName: x.User.firstName, 
        userLastName: x.User.lastName,
    }, x => {console.log(`in UpdateCourse new state email is ${this.state.userEmail}`)})
    }) 
    .catch( 'error in fetching courses') 
  };
 

handleUpdate = (e,password,title, description) => {
    const { history } = this.props ;
    e.preventDefault();
    console.log(`Hallo ich bin in handleUpdate in UpdateCourses. The title ${title}`)
    const { location} = this.props ;
    console.log(`password is ${password} and location is ${location.pathname.slice(0, -7)}` );
    var data = JSON.stringify({
      "id": this.state.courseId,
      "title": title,
      "description": description,
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
        } else { console.log("status ungleich 204"); this.props.history.push('/forbidden') } 
    })  // update page
    .catch(function (error) {
      this.props.history.push('/forbidden');  
      console.log(error);
    }); 
}


  componentDidMount() {
    this.getCourse() ;
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
        <form>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input id="courseTitle" name="courseTitle" type="text" defaultValue={this.state.title} />
              <p> By {this.state.userFirstName} {this.state.userLastName} </p>
              <label htmlFor="courseDescription">Course Description</label>
              <textarea id="courseDescription" name="courseDescription" defaultValue={this.state.description } />
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input id="estimatedTime" name="estimatedTime" type="text" defaultValue={this.state.estimatedTime} />
              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea id="materialsNeeded" name="materialsNeeded" defaultValue={this.state.material} />
            </div>
          </div>
          <button className="button" type="submit" onClick={ e => this.handleUpdate(e,logged[0].password, document.querySelector("#courseTitle").value,document.querySelector("#courseDescription").value) } >Update Course</button>
          <button className="button button-secondary" onClick={e => this.handleCancel(e)} >Cancel</button>
        </form>
      </div>
        )}
    </Consumer>
    );
  }
}
export default withRouter(UpdateCourse);
