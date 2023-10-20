import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import './dashboard.css';

import ReservationPage from './ReservationPage';
import UserViewReservationsPage from './UserViewReservationPage';

function UserDashboardPage() {
  return (
    <div className="dashboard-container">
      <UserViewReservationsPage/>
    </div>
  );
}

export default UserDashboardPage;