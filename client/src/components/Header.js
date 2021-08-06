import React from 'react';
import { Consumer } from './Context';
import { Link } from 'react-router-dom';

const Header = (props) => {
    return (
        <Consumer>
        { ({ actions, logged } ) => (
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
            { logged[0].status==="authenticated" ? (
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
