import React, { PureComponent } from 'react'; 
import PropTypes from 'prop-types';
import {withRouter} from 'react-router'; // required for accessing the location prop 
import { Consumer } from './Context';
import {Link} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
const axios = require('axios') ;

class CourseDetail extends PureComponent { 
  static propTypes = {
    location: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {title: '', courseId: '', material: '', description: '', estimatedTime: '', userId: '', userEmail: '', 
    userFirstName:'',userLastName: ''}
  };

  /* 
  creates a list of li elements for materialNeeded --- legacy ... did it before switching to react-markdown
  */ 
  /*createMaterialList = (instr) => {
    let outArr = [];
    console.log(instr.materialsNeeded)
    outArr = instr.materialsNeeded ? instr.materialsNeeded.split("* ") : [''] ;
    let res = [] ;
    for (let i=0; i<outArr.length ; i+=1 ) {
     res.push(<li> {outArr[i]}  </li>) // key={i} return valid jsx ,mhhh?
    }
  return res; 
  } */

  updateCourses = () =>  {
    const { location, history} = this.props ;
    const options = {
      headers: new Headers({'content-type': 'application/json'}),
    };
    //const idFromRoute = location.pathname.split('/')[2] ;
    console.log(`props match: ${this.props.match.params.id}`)
    fetch(
      `http://localhost:5000/api/courses/${this.props.match.params.id}`)
    .then((res) => { console.log(`props id: ${this.props.match.params.id}`); 
      //if (res.json().User.id !== this.props.match.params.id) {
      //  this.props.history.push("/notfound");
     // } else {
        res.json().then( (course) => {
          console.log(`response key: ${course.User.id}`);
          if (course.id==this.props.match.params.id) {
            this.setState({
              courseId: course.id ,
              title: course.title,
              //material: this.createMaterialList(x) , # legacy 
              material: course.materialsNeeded,
              description: course.description,
              estimatedTime: course.estimatedTime,
              userId: course.User.id,
              userEmail: course.User.emailAddress,
              userFirstName: course.User.firstName , 
              userLastName: course.User.lastName,
          }, x => { console.log(`in CourseDetails new state userId is ${this.state.userId}`)}) ; 
        } else {
          console.log(" redirect to /notfound")
          this.props.history.push("/notfound") ; }
        })}) 
  };
 
  componentDidMount() {
    this.updateCourses()
  } 

  /*
  componentWillReceiveProps(nextProps){
       this.setState({ 
          switch: !(this.state.switch)
       })
 } */
deleteCourse = (e, coursePath, password) =>  {
  e.preventDefault() ; 
  console.log(`password is : ${password}`)
  let id = coursePath.split('/').pop() ;
  console.log(`the id to be deleted is: ${id}`);

  let config = {
  method: 'delete',
  url: `http://localhost:5000/api/courses/${id}`,
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': password
    }
  };
console.log(config);
axios(config)
.then( courseonse => { if(courseonse.status===204) { console.log("status 204") ;  this.props.history.push('/') ;
        } else { console.log("status ungleich 204"); this.props.history.push('/forbidden') } 
    })  // update page
.catch(function (error) {
  console.log(error);
  console.log(`deletion of courseId ${id} failed`);
});
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
                  { 
                  console.log(`In courseDetail. Auth-status is:  ${logged[0].status} and 
                  loggedIn userEmail is ${logged[0].email}, path is: ${this.props.location.pathname}/update}`) 
                  }
                  { (logged[0].status==="authenticated" && logged[0].email===this.state.userEmail) ? 
                  ( <>
                    <Link className="button" to={`${this.props.location.pathname}/update`}> 
                      Update Course
                    </Link>
                    <a className="button" onClick={e => {this.deleteCourse(e,this.props.location.pathname, logged[0].password)}} >Delete Course</a>
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
                      <ReactMarkdown>{this.state.description}</ReactMarkdown> 
                    </div>
                    <div>
                      <h3 className="course--detail--title"> Estimated Time </h3>
                      <p> {this.state.estimatedTime} </p>
                      <h3 className="course--detail--title"> Materials Needed </h3>
                      <ul className="course--detail--list">
                      <ReactMarkdown>{this.state.material}</ReactMarkdown>                        
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
