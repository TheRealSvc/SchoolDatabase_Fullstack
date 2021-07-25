import React from 'react';


const courseElement = (props) => {
    console.log(`in Course: ${props.course.title}`);

    return (  
    <a className="course--module course--link" href="course-detail.html">
      <h2 className="course--label">Course</h2>
      <h3 className="course--title">{props.course[1]}</h3>
    </a>

     //<tbody>
     //  <tr>
     //    <td> <a href={`/courseDetails/${props.course[0]}`}> {props.course[0]} </a></td>
      //   <td> {props.course[1]} </td>
      //   <td> {props.course[2]} </td>
     //  </tr>
    // </tbody>
    );
}

export default courseElement;