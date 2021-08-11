import React, { Component } from 'react'; 
import PropTypes from 'prop-types';
import { Consumer } from './Context';
import {Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
const axios = require('axios') ;

class CourseDetail extends Component { 
  static propTypes = {
    location: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {title: '', courseId: '', material: '', description: '', estimatedTime: '', userId: '', userEmail: '', 
    userFirstName:'', userLastName: ''}
  };


  getIdfromPath = () =>  {
    let pathy=this.props.location.pathname.split("/") ; 
    let pathid = pathy[pathy.length-1] ;
    return pathid ;
  };

  updateCourses = () =>  {
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
              courseId: course.id ,
              title: course.title,
              material: course.materialsNeeded,
              description: course.description,
              estimatedTime: course.estimatedTime,
              userId: course.User.id,
              userEmail: course.User.emailAddress,
              userFirstName: course.User.firstName , 
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
 
  componentDidMount() {
    this.updateCourses()
  } 

deleteCourse = (e, coursePath, password) =>  {
  e.preventDefault() ; 
  console.log(`password is : ${password}`)
  let id = coursePath.split('/').pop() ;
  console.log(`the id to be deleted is: ${id}`);

  let config = {
  method: 'delete',
  url: `http://localhost:5000/api/courses/${id}`,
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': password
    }
  };
console.log(config);
axios(config)
.then( courseonse => { if(courseonse.status===204) { console.log("status 204") ;  this.props.history.push('/') ;
        } else { console.log("status ungleich 204"); this.props.history.push('/forbidden') } 
    }) 
    .catch((error) => {console.log(error);
      this.props.history.push("/error")})
}


/* 
On the "Course Detail" screen, add rendering logic so that the "Update Course" and "Delete Course" buttons only display if:
There's an authenticated user.
And the authenticated user's ID matches that of the user who owns the course.
*/
  render(){
    return (
      <Consumer>
      { ({ actions, logged }) => (
        <div>
         <main>
              <div className="actions--bar">
                <div className="wrap">
                  { (logged[0].status==="authenticated" && logged[0].email===this.state.userEmail) ? 
                  ( <>
                    <Link className="button" to={`${this.props.location.pathname}/update`}> 
                      Update Course
                    </Link>
                    <a className="button" onClick={e => {this.deleteCourse(e,this.props.location.pathname, logged[0].password)}} >Delete Course</a>
                    <Link className="button button-secondary" to="/">
                    Return to List
                    </Link> 
                    </> ) : (  
                    <Link className="button button-secondary" to="/">
                    Return to List
                    </Link> )
                  }
                </div>
              </div>
              <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                  <div className="main--flex">
                    <div>
                      <h3 className="course--detail--title">Course</h3>
                      <h4 className="course--name"> {this.state.title} </h4>
                      <p> By {` ${this.state.userFirstName} ${this.state.userLastName} ` } </p>
                      <ReactMarkdown>{this.state.description}</ReactMarkdown> 
                    </div>
                    <div>
                      <h3 className="course--detail--title"> Estimated Time </h3>
                      <p> {this.state.estimatedTime} </p>
                      <h3 className="course--detail--title"> Materials Needed </h3>
                      <ul className="course--detail--list">
                      <ReactMarkdown>{this.state.material}</ReactMarkdown>                        
                      </ul>
                    </div>
                  </div>
                </form>
              </div>
            </main>
          </div>
          )}
      </Consumer>
      );
}
}
export default CourseDetail;
