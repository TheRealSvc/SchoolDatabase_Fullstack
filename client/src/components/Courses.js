import React, { Component } from 'react'; 
import CourseElement from './CourseElement';
import '../global.css';
import {Link} from 'react-router-dom';

/*
Courses - This component provides the "Courses" screen by retrieving the list of courses from the REST API's /api/courses route and rendering a list of courses. 
Each course needs to link to its respective "Course Detail" screen. 
This component also renders a link to the "Create Course" screen.
*/
class Courses extends Component { 
    constructor(props) {
        super(props);
        this.state = {courses: ''}
      };

      updateCourses = () =>  {
        const options = {
          headers: new Headers({'content-type': 'application/json'}),
        };
        fetch('http://localhost:5000/api/courses', options)
        .then( x => x.json())
        .then( x => { this.setState({courses: x }) })
        .catch( 'error in fetching courses') 
      };

      componentDidMount() {
        this.updateCourses()
      } 

      createCourseArray = (courses) => {
        let courseArray = [] ;
         for (let i=0; i<courses.length; i++) {
           courseArray.push(
           <CourseElement course={[courses[i].id, courses[i].title, courses[i].estimatedTime]} key={i} /> );
         }
         return courseArray ; 
        };

        render() {
          return (
            <div>
                <main>
                  <div className="wrap main--grid">
                  {this.createCourseArray(this.state.courses)}
                  <Link className="course--module course--add--module" to="/courses/create">
                    New Course 
                  </Link> 
                  </div>
                </main>
              </div>
          );
        };
      }

export default Courses;
