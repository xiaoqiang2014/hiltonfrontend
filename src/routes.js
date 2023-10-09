import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import DashboardPage from './components/DashboardPage';
import ReservationPage from './components/ReservationPage';
import ViewReservationsPage from './components/ViewReservationsPage';

const isAuthenticated = () => {
  // For testing purposes, always return true to simulate an authenticated user
  return true;
};

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <DashboardPage>
          <Component {...props} />
        </DashboardPage>
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Redirect to="/dashboard" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const Routes = () => {
  return (
    <Router>
      <Switch>
        <PublicRoute exact path="/login" component={LoginPage} />
        <PublicRoute exact path="/register" component={RegisterPage} />
        <ProtectedRoute exact path="/dashboard" component={DashboardPage} />
        <ProtectedRoute exact path="/dashboard/make-order" component={ReservationPage} />
        <ProtectedRoute exact path="/dashboard/view-reservations" component={ViewReservationsPage} />
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  );
};

export default Routes;