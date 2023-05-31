import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      <Fragment>
        <Component {...props} />
      </Fragment>
    )}
  />
);

export default PublicRoute;
