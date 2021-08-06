import React from 'react';
import { Link } from 'react-router-dom';

const courseElement = (props) => {
    console.log(`in CourseElement: ${props.course.title}`);

    return (  
      <Link className="course--module course--link" to={`/courses/${props.course[0]}`}>
                        <h3 className="course--label">Course</h3>
                        <h2 className="course--title">{props.course[1]}</h2>
      </Link>
    );
}

export default courseElement;