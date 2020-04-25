import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { Auth, Register, Dashboard } from './views'

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
        <Route
          exact
          path="/dashboard"
          component={Dashboard}
        />

        <Redirect to="/auth" />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
