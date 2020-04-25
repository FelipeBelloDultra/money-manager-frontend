import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { Auth, Register, Dashboard, Historic } from './views'
import { PrivateRoute } from './components';
import { MainLayout } from './layouts';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/auth"
          component={Auth}
        />
        <Route
          exact
          path="/register"
          component={Register}
        />
        <PrivateRoute
          layout={MainLayout}
          path="/dashboard"
          exact
          component={Dashboard}
        />
        />
        <PrivateRoute
          layout={MainLayout}
          exact
          path="/historic"
          component={Historic}
        />
        <Redirect to="/auth" />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
