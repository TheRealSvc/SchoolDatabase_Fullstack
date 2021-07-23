import React from 'react';


const courseElement = (props) => {
    console.log(`in Course: ${props.course.title}`);


    return (  
     <tbody>
       <tr>
         <td> <a href={`/courseDetails/${props.course[0]}`}> {props.course[0]} </a></td>
         <td> {props.course[1]} </td>
         <td> {props.course[2]} </td>
       </tr>
     </tbody>
    );
}

export default courseElement;