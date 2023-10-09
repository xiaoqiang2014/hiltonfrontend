import React from 'react';

function ViewReservationsPage() {
  // Fetch reservations from backend or use dummy data
  const reservations = [
    { id: 1, name: 'Reservation 1' },
    { id: 2, name: 'Reservation 2' },
    { id: 3, name: 'Reservation 3' },
  ];

  return (
    <div>
      <h1>View Reservations Page</h1>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.id}>{reservation.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ViewReservationsPage;