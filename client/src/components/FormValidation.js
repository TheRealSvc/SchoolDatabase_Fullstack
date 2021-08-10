import React from 'react';
import CreateCourse from './CreateCourse';


// component for basic form validation 
const FormValidation = (props) => {
  console.log(`in FormValidation ${Object.keys(props)}`);

  //let sumLenZero = Object.values(props).map( x => x.length==0).reduce((acc, cur) => acc + cur, 0) ;
  let keysWithZeroLen = Object.entries(props).filter( x => x[1].length==0).map(function(x) {
    return x[0];
  });
  
  console.log(keysWithZeroLen);

    if (keysWithZeroLen.length) {
      return (
        <div class="validation--errors">
         <ul>
            <li class="validation--fonts"> 
             Please a provide a value for:  {keysWithZeroLen.join(" , ")}
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

