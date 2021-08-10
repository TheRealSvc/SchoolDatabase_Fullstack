// displays a message in case of unhandled Problems
import React, { Fragment } from 'react';

const UnhandledError = () => (
    <Fragment>
        <div className="bounds">
            <h1>Unhandles Error</h1>
            <p> Something went wrong </p>
        </div>
    </Fragment>
);

export default UnhandledError;