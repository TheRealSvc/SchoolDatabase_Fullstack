
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
      const options = {
        headers: new Headers({'content-type': 'application/json'}),
      };
      const  courses = fetch('http://localhost:5000/api/courses', options)
      .then( x => x.json())
      .then( x => { this.setState({courses: x }) ; console.log(this.state) })
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
              <Route exact path= "/"  render={ () => <Courses/> } />  
              <Route exact path="/courses/:id" render={ () => <CourseDetail/> } />   
            </Switch> 
          </BrowserRouter> }
       </div>   
    );
    //component={() => <PropsPage title={`Props through component`} />} 
    }
    }
    
    /*
    render() {
      return (
      <BrowserRouter> 
        <div className="container">
          <SearchForm changeSearchTopic={this.updateSearchTopic} /> 
          <Nav changeSearchTopicNav={this.updateSearchTopic} /> 
          <Switch>
            <Route exact path="/:searchTopic" render={ () => <PhotoContainer photos={this.state.photos} /> } />   
            <Route component={NotFound} />
            
          </Switch>
        </div>
      </BrowserRouter>
    );
    } */
  
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
