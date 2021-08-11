// displays a message in case of unhandled Problems
import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';

const UnhandledError = () => (
    <Fragment>
        <div className="bounds">
            <h1> 500 Internal Error </h1>
            <p> Ups, something went wrong </p>
            <Link to="/"> Back to Courses </Link>
        </div>
    </Fragment>
);

export default UnhandledError;