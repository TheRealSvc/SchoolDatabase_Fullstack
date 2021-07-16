import React, { Component } from 'react'; 

/*
Courses - This component provides the "Courses" screen by retrieving the list of courses from the REST API's /api/courses route and rendering a list of courses. 
Each course needs to link to its respective "Course Detail" screen. 
This component also renders a link to the "Create Course" screen.
*/
class Courses extends Component { 

    render() {  
    return( <div> 
        this.props.courses
        </div>

    )}
}

export default Courses;
