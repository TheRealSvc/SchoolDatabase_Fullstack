import './index.css';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import Header from './components/Header';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';
import PrivateRoute from './components/PrivateRoute'
import Forbidden from './components/Forbidden'
import NotFound from './components/NotFound'
import UnhandledError from './components/UnhandledError'
import React, { Component } from 'react';


import {
    BrowserRouter,
    Route,
    Switch,
  } from 'react-router-dom';

/**
 * Main component for routing 
 */
class App extends Component  {

    constructor(props) {
      super(props);
    };
 
    // Routing 
    render() {
      return ( 
        <BrowserRouter>    
        <div className="container"> 
        <Header/>
            <Switch> 
              <Route exact path= "/" component={Courses} /> 
              <Route path="/signin" component={UserSignIn} />  
              <Route path="/signup" component={UserSignUp} />
              <Route path="/signout" component={UserSignOut} />
              <PrivateRoute exact path="/courses/create" component={CreateCourse} />
              <Route exact path="/courses/:id" component={CourseDetail} />  
              <PrivateRoute exact path="/courses/:id/update" component={UpdateCourse} />
              <Route path="/forbidden" component={Forbidden} />
              <Route path="/notfound" component={NotFound} />  
              <Route path="/error" component={UnhandledError} />
              <Route component={NotFound} />
            </Switch> 
        </div>
        </BrowserRouter>   
    );
    }
}

export default App;
