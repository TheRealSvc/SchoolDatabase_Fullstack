// displays a message in case of authorization issues
import React, { Fragment } from 'react';

const Forbidden = () => (
    <Fragment>
        <div className="bounds">
            <h1>Access denied</h1>
            <p> Your are are either not logged in or your used has no permissions</p>
        </div>
    </Fragment>
);

export default Forbidden;