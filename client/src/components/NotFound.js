// displays a message in case route cannot be found
import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';

const NotFound = () => (
    <Fragment>
        <div className="bounds">
            <h1> Not Found </h1>
            <p> The Route could not be found </p>
            <Link to="/"> Back to Courses </Link>
        </div>
    </Fragment>
);

export default NotFound;