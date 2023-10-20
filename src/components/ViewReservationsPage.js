import React from 'react';
//import { useQuery, useMutation } from '@apollo/client';
//import { GET_RESERVATIONS_QUERY, CANCEL_RESERVATION_MUTATION } from './graphql/reservation';

function ViewReservationsPage() {
  let loading = false;
  let error = false
  let data = {
    reservations: [
      {
        guestName: "guest",
        guestContactInfo: "10xx20",
        arrivalTime: "2022-2-22",
        tableSize: 2,
        status: "arrived",
        userEmail: "xx",
        orderTime:"2022-2-10",
      },
    ],
  };

  //const { loading, error, data } = useQuery(GET_RESERVATIONS_QUERY);
  //const [cancelReservation] = useMutation(CANCEL_RESERVATION_MUTATION);

  const handleCancelReservation = async (reservationId) => {
    try {
      await cancelReservation({
        variables: {
          reservationId,
        },
      });

      // Handle successful cancellation
      console.log(`Cancel reservation with ID: ${reservationId}`);
    } catch (error) {
      // Handle cancellation error
      console.log(error);
    }
  };

  if (loading) {
    return <p>Loading reservations...</p>;
  }

  if (error) {
    return <p>Error fetching reservations: {error.message}</p>;
  }

  const reservations = data.reservations;

  return (
    <div>
      <h1>View Reservations Page</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Guest Name</th>
            <th>Guest Contact Info</th>
            <th>Expected Arrival Time</th>
            <th>Reserved Table Size Info</th>
            <th>Status</th>
            <th>User Email</th>
            <th>Order Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>{reservation.guestName}</td>
              <td>{reservation.guestContactInfo}</td>
              <td>{reservation.arrivalTime}</td>
              <td>{reservation.tableSize}</td>
              <td>{reservation.status}</td>
              <td>{reservation.userEmail}</td>
              <td>{reservation.orderTime}</td>
              <td>
                <button
                  onClick={() => handleCancelReservation(reservation.id)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: 'red',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewReservationsPage;