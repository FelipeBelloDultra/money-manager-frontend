import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { isAuthenticated } from '../../utils/auth';

const PrivateRoute = (props) => {
  const { layout: Layout, component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={matchProps =>
        isAuthenticated() ? (
          <Layout>
            <Component {...matchProps} />
          </Layout>
        ) : (
            <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />
          )
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string,
};

export default PrivateRoute;
