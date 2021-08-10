import {React, useEffect }  from 'react';
import { Consumer } from './Context';
import { Link } from 'react-router-dom';
import { useContext } from 'react';

const Header = (props) => {
  //const { logged } = useContext(Consumer);
  //console.log(Object.entries(logged[0]));  
    return (
        <Consumer>
        { ({ actions, logged } ) => (
        <div>
  
        <div id="root">
          <header>
            <div className="wrap header--flex">
              <h1 className="header--logo"><a href="index.html">Courses</a></h1>
              <nav>
            {  logged[0].status==="authenticated" ? (
              <>
                <ul className="header--signedin">
                    <li style={{ textTransform: 'capitalize' }}>
                      Welcome, {logged[0].firstname } {logged[0].lastname}!
                    </li>
                    <li>
                      <Link to='/signout'>Sign Out</Link>
                    </li>
                </ul>
              </>
            ) : (
              <>
                <ul className="header--signedin">
                    <li>
                      <Link to='/signin'>Sign in</Link>
                    </li>
                    <li>
                      <Link to='/signup'>Sign up</Link>
                    </li>
                </ul>
              </>
            )}
              </nav>
            </div>
          </header>    
          </div>
          </div>
            )}
        </Consumer>
         )}
     

export default Header;
