import React, { PureComponent } from 'react'; 
import PropTypes from 'prop-types';
import {withRouter} from 'react-router'; // required for accessing the location prop 
import { Consumer } from './Context';
import {Link} from 'react-router-dom';

class CourseDetail extends PureComponent { 
  static propTypes = {
    location: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {title: '', courseId: '', material: '', description: '', estimatedTime: '', userId: '', userEmail: '', userFirstName:'',userLastName: ''}
  };

  /* 
  creates a list of li elements for materialNeeded
  */ 
  createMaterialList = (instr) => {
    let outArr = [];
    console.log(instr.materialsNeeded)
    outArr = instr.materialsNeeded ? instr.materialsNeeded.split("* ") : [''] ;
    let res = [] ;
    for (let i=0; i<outArr.length ; i+=1 ) {
     res.push(<li> {outArr[i]}  </li>) // key={i} return valid jsx ,mhhh?
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
    .then( x => { if(this.state.courseId !== x.id) { 
      console.log(`State did change in CourseDetails: old: ${this.state.courseId}, new: ${x.id}`);
      this.setState({
        courseId: x.id ,
        title: x.title,
        material: this.createMaterialList(x) ,
        description: x.description,
        estimatedTime: x.estimatedTime,
        userId: x.User.id,
        userEmail: x.User.emailAddress,
        userFirstName: x.User.firstName , 
        userLastName: x.User.lastName,
    }, x => {console.log(`in CourseDetails new state email is ${this.state.userEmail}`)} )
    }}) 
    .catch(function (error) {
      console.log(error) })
  };
 
  componentDidMount() {
    this.updateCourses()
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
                  {console.log(`in courseDetail. Auth-status is:  ${logged[0].status} and loggedIn userEmail is ${logged[0].email}, path is: ${this.props.location.pathname}/update}`)}
                  {(logged[0].status==="authenticated" &&  logged[0].email===this.state.userEmail) ? 
                  ( <>
                    <Link className="button" to={`${this.props.location.pathname}/update`}> 
                      Update Course
                    </Link>
                    <a className="button" href="#">Delete Course</a>
                    <Link className="button button-secondary" to="/">
                    Return to List
                    </Link> 
                    </> ) : (  
                    //<a className="button button-secondary" href="/">Return to List</a>
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
                      {this.state.description}
                    </div>
                    <div>
                      <h3 className="course--detail--title">  Estimated Time </h3>
                      <p> {this.state.estimatedTime} </p>
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
          )}
      </Consumer>
      );
}
}
export default withRouter(CourseDetail);
