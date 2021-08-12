import React from 'react';



// component for basic form validation. Displays API errors coming from teh API  
const FormValidation = (props) => {

let keysWithZeroLen = props.ApiError ;

    if (keysWithZeroLen.length) {
      return (
        <div className="validation--errors">
         <ul>
            <li className="validation--fonts"> 
              {keysWithZeroLen.join(" , ")}
           </li> 
         </ul>
       </div> 
    )} else {
      return(
        <div> </div>
      )
    }   
  }

export default FormValidation ;

