import React from 'react';
import { Route, Redirect ,Switch,BrowserRouter} from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import DashboardPage from './components/DashboardPage';
import ReservationPage from './components/ReservationPage';
import ViewReservationsPage from './components/ViewReservationsPage';
import UserDashboardPage from './components/UserDashboardPage';

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

const isAdmin = () => {
  const token = sessionStorage.getItem('token');
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role;
      return userRole === 'employee';
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
        isAdmin() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/userdashboard" />
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
        isAdmin() ? (
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
        <ProtectedRoute exact path="/dashboard" component={DashboardPage} role="admin" />
        <ProtectedRoute exact path="/userdashboard" component={UserDashboardPage} role="user" />
        <ProtectedRoute exact path="/dashboard/make-order" component={ReservationPage} role="user" />
        <ProtectedRoute exact path="/dashboard/view-reservations" component={ViewReservationsPage} role="admin" />
        <Redirect from="/" to="/login" />
  </Switch>
  </BrowserRouter>

);

export default Routes;