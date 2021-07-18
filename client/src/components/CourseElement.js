import React from 'react';


const courseElement = (props) => {
    console.log(`in Course: ${props.title}`);
    return (  
      <li  >
        {props.title}
      </li>
    );
}

export default courseElement;