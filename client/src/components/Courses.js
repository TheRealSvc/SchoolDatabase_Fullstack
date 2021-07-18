import React, { Component } from 'react'; 
import CourseElement from './CourseElement';

/*
Courses - This component provides the "Courses" screen by retrieving the list of courses from the REST API's /api/courses route and rendering a list of courses. 
Each course needs to link to its respective "Course Detail" screen. 
This component also renders a link to the "Create Course" screen.ateCorsesArray
*/
class Courses extends Component { 
    constructor(props) {
        super(props);
        console.log(`in Courses: ${props}`);
      }

      createCourseArray = (courses) => {
        console.log(`in createCourseArray Anfang:${courses}`);
        let courseArray = [] ;
         for (let i=0; i<courses.length-1; i++) {
           courseArray.push(
           <CourseElement title={courses[i].title}  key={i} /> );
         }
         return courseArray ; 
        };

        render() {
            return (
                <div className="courses-container">
                 <h2> Courses </h2>    
                    <ul>
                        {this.createCourseArray(this.props.courses)}
                    </ul>
                </div > 
                )
            }
        }

export default Courses;
