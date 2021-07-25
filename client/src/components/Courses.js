import React, { Component } from 'react'; 
import CourseElement from './CourseElement';
import '../global.css';

/*
class Courses extends Component {
  render: function() {
    return (
      <div>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="Treehouse Full Stack JavaScript Project 10 | Full Stack App with React and a REST API" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon" />
        <title>Courses</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400&display=swap" rel="stylesheet" />
        <link href="../styles/reset.css" rel="stylesheet" />
        <link href="../styles/global.css" rel="stylesheet" />
        <div id="root">
          <header>
            <div className="wrap header--flex">
              <h1 className="header--logo"><a href="index.html">Courses</a></h1>
              <nav>
                <ul className="header--signedout">
                  <li><a href="sign-up.html">Sign Up</a></li>
                  <li><a href="sign-in.html">Sign In</a></li>
                </ul>
              </nav>
            </div>
          </header>
          <main>
            <div className="wrap main--grid">
              <a className="course--module course--link" href="course-detail.html">
                <h2 className="course--label">Course</h2>
                <h3 className="course--title">Build a Basic Bookcase</h3>
              </a>
              <a className="course--module course--link" href="course-detail.html">
                <h2 className="course--label">Course</h2>
                <h3 className="course--title">Learn How to Program</h3>
              </a>
              <a className="course--module course--link" href="course-detail.html">
                <h2 className="course--label">Course</h2>
                <h3 className="course--title">Learn How to Test Programs</h3>
              </a>
              <a className="course--module course--add--module" href="create-course.html">
                <span className="course--add--title">
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 " /></svg>
                  New Course
                </span>
              </a>
            </div>
          </main>
        </div>
      </div>
    );
  }
});
}
*/

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
           <CourseElement course={[courses[i].id ,courses[i].title, courses[i].estimatedTime]}  key={i} /> );
         }
         return courseArray ; 
        };

        render() {
          return (
            <div>
              <meta charSet="UTF-8" />
              <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
              <meta name="description" content="Treehouse Full Stack JavaScript Project 10 | Full Stack App with React and a REST API" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon" />
              <title>Courses</title>
              <link rel="preconnect" href="https://fonts.gstatic.com" />
              <link href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400&display=swap" rel="stylesheet" />
              <link href="../styles/reset.css" rel="stylesheet" />
              <link href="../styles/global.css" rel="stylesheet" />
              <div id="root">
                <header>
                  <div className="wrap header--flex">
                    <h1 className="header--logo"><a href="index.html">Courses</a></h1>
                    <nav>
                      <ul className="header--signedout">
                        <li><a href="sign-up.html">Sign Up</a></li>
                        <li><a href="sign-in.html">Sign In</a></li>
                      </ul>
                    </nav>
                  </div>
                </header>
                <main>
                  <div className="wrap main--grid">
                  {this.createCourseArray(this.props.courses)}
                    <a className="course--module course--add--module" href="create-course.html">
                      <span className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 " /></svg>
                        New Course
                      </span>
                    </a>
                  </div>
                </main>
              </div>
            </div>
          );
        };
      }
export default Courses;
