import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import './dashboard.css';

import ReservationPage from './ReservationPage';
import ViewReservationsPage from './ViewReservationsPage';

function UserDashboardPage() {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Sidebar</h2>
        <ul>
          <li>
            <Link to="/dashboard/make-order">Make Order</Link>
          </li>
          <li>
            <Link to="/dashboard/view-reservations">View Reservations</Link>
          </li>
        </ul>
      </div>
      <div className="view-panels">
        <Switch>
          <Route exact path="/dashboard/make-order" component={ReservationPage} />
          <Route exact path="/dashboard/view-reservations" component={ViewReservationsPage} />
          {/* Render ViewReservationsPage by default */}
          <Route component={ViewReservationsPage} />
        </Switch>
      </div>
    </div>
  );
}

export default UserDashboardPage;