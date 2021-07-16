
import './index.css';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import Header from './components/Header';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';

import React, { Component } from 'react';

import {
    BrowserRouter,
    Route,
    Switch,
  } from 'react-router-dom';
  
  


class App extends Component  {
    //initialize with defaults
    constructor(props) {
      super(props);
      this.state = {
        courses: ''
      } ;
      //this.searchHistory = [] ; 
      this.updateCourses = this.updateCourses.bind(this) ;
      //this.createCoursesComps = this.createCoursesComps.bind(this) ; 
    }

    updateCourses = () =>  {
      const  courses = fetch('localhost:5000')
      .then( x => x.json() )
      .then( x => this.setState({courses: x }))
      .catch( 'error in fetching courses') 
    };


    componentDidMount() {
        this.updateCourses()
      } 
         
    // Routing 
    render() {
      return (    
        <div className="container">
        {
         // (this.state.loading)
        //   ? <p> Loading...</p>
        //   :
          <BrowserRouter> 
            <Switch> 
              <Route exact path= "/" component={ () =>  <Courses courses = {this.state.courses}/> } />  
            </Switch> 
          </BrowserRouter> }
       </div>   
    );
    //component={() => <PropsPage title={`Props through component`} />} 
    }
    }
    
  
/* the required routes 
/ - Courses
/courses/create - CreateCourse
/courses/:id/update - UpdateCourse
/courses/:id - CourseDetail
/signin - UserSignIn
/signup - UserSignUp
/signout - UserSignOut

*/
export default App;
