// displays a message in case route cannot be found
import React, { Fragment } from 'react';

const NotFound = () => (
    <Fragment>
        <div className="bounds">
            <h1> Not Found </h1>
            <p> The Route could not be found </p>
        </div>
    </Fragment>
);

export default NotFound;