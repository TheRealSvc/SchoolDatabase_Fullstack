import React, { Component } from 'react'; 
import PropTypes from 'prop-types';
import {withRouter} from 'react-router'; // required for accessing the location prop 

class CourseDetail extends Component { 
  static propTypes = {
    location: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {course: '', material: '', user: ''}
  };

  componentDidUpdate() {
    const { location} = this.props ;
  }

  /* 
  creates a list of li elements for materialNeeded
  */ 
  createMaterialList = (instr) => {
    let outArr = [];
    console.log(instr.materialsNeeded)
    outArr = instr.materialsNeeded ? instr.materialsNeeded.split("* ") : [''] ;
    let res = [] ;
    for (let i=0; i<outArr.length ; i+=1 ) {
     res.push(<li> {outArr[i]} </li>) // return valid jsx 
    }
  return res; 
  }

  updateCourses = () =>  {
    const { location} = this.props ;
    const options = {
      headers: new Headers({'content-type': 'application/json'}),
    };
    const  courses = fetch(`http://localhost:5000/api/${location.pathname}`, options)
    .then( x => x.json())
    .then( x => { this.setState({
      course: x ,
      material: this.createMaterialList(x) ,
      user: x.User
    }) 
    })
    .catch( 'error in fetching courses') 
  };

 
  componentDidMount() {
    this.updateCourses()
  } 

  render(){
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
                  <ul className="header--signedin">
                    <li>Welcome, Joe Smith!</li>
                    <li><a href="sign-out.html">Sign Out</a></li>
                  </ul>
                </nav>
              </div>
            </header>
            <main>
              <div className="actions--bar">
                <div className="wrap">
                  <a className="button" href="update-course.html">Update Course</a>
                  <a className="button" href="#">Delete Course</a>
                  <a className="button button-secondary" href="index.html">Return to List</a>
                </div>
              </div>
              <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                  <div className="main--flex">
                    <div>
                      <h3 className="course--detail--title">Course</h3>
                      <h4 className="course--name">Build a Basic Bookcase</h4>
                      <p> By {` ${this.state.user.firstName} ${this.state.user.lastName} ` } </p>
                      {this.state.course.description}
                    </div>
                    <div>
                      <h3 className="course--detail--title">  Estimated Time </h3>
                      <p> {this.state.course.estimatedTime} </p>
                      <h3 className="course--detail--title">Materials Needed</h3>
                      <ul className="course--detail--list">
                          {this.state.material}                           
                      </ul>
                    </div>
                  </div>
                </form>
              </div>
            </main>
          </div>
        </div>
      );
}
}
export default withRouter(CourseDetail);
