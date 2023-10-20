import React from 'react';
import { Route, Redirect ,Switch,BrowserRouter} from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import DashboardPage from './components/DashboardPage';
import ReservationPage from './components/ReservationPage';
import ViewReservationsPage from './components/ViewReservationsPage';
import UserDashboardPage from './components/UserDashboardPage';
import UserViewReservationsPage from "./components/UserViewReservationPage";

const isAuthenticated = () => {
  const token = sessionStorage.getItem("token");
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        // Token has expired
        return false;
      }
      return true;
    } catch (error) {
      // Error decoding token
      return false;
    }
  }
  return false;
};

const matchRole = (role) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.role === role;
    } catch (error) {
      // Error decoding token
      return false;
    }
  }
  return false;
};

const ProtectedRoute = ({ component: Component, role, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        matchRole(role) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
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
        matchRole('employee') ? (
          <Redirect to="/dashboard" />
        ) : (
          <Redirect to="/userdashboard" />
        )
      ) : (
        <Component {...props} />
      )
    }
  />
);


const Routes = () => (
  <BrowserRouter>
    <Switch>
      <PublicRoute exact path="/login" component={LoginPage} />
      <PublicRoute exact path="/register" component={RegisterPage} />
      <ProtectedRoute
        exact
        path="/dashboard"
        component={DashboardPage}
        role="employee"
      />
      <ProtectedRoute
        exact
        path="/userdashboard"
        component={UserDashboardPage}
        role="guest"
      />
      <ProtectedRoute
        exact
        path="/userdashboard/make-order"
        component={ReservationPage}
      />
      <ProtectedRoute
        exact
        path="/userdashboard/view-reservations"
        component={UserViewReservationsPage}
      />
      <ProtectedRoute
        exact
        path="/dashboard/view-reservations"
        component={ViewReservationsPage}
      />
      <Redirect from="/" to="/login" />
    </Switch>
  </BrowserRouter>
);

export default Routes;