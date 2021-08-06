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

import React, { Component } from 'react';


import {
    HashRouter,
    Route,
    Switch,
  } from 'react-router-dom';


class App extends Component  {
    constructor(props) {
      super(props);
    };
 
    // Routing 
    render() {
      return ( 
        <HashRouter>    
        <div className="container"> 
        <Header/>
            <Switch> 
              <Route exact path= "/" component={Courses} /> 
              <Route path="/signin" component={UserSignIn} />  
              <Route path="/signup" component={UserSignUp} />
              <PrivateRoute exact path="/courses/create" component={CreateCourse} />
              <Route exact path="/courses/:id" component={CourseDetail } />  
              <PrivateRoute exact path="/courses/:id/update" component={UpdateCourse} />
              <Route path="/forbidden" component={Forbidden} />
            </Switch> 
        </div>
        </HashRouter>   
    );
    }
}
    
export default App;


/*
           <Route exact path= "/" render={ () => <Courses  /> } />  
              <Route eaxct path="/courses/:id" render={ () => <CourseDetail /> } />  
   <PrivateRoute path='/courses/create' component={CreateCourse} />
              <Route exact path="/signin" render={ () => <UserSignIn /> } />   
              <Route path="/signup" component={UserSignUp} />
              <Route path="/signout" render={ () => <UserSignOut /> } />

*/