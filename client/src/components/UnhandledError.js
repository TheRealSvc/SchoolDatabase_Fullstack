// displays a message in case of unhandled Problems
import React, { Fragment } from 'react';

const UnhandledError = () => (
    <Fragment>
        <div className="bounds">
            <h1> 500 Internal Error </h1>
            <p> Ups, something went wrong </p>
        </div>
    </Fragment>
);

export default UnhandledError;