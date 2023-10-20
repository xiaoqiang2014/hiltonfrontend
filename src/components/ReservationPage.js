import React, { useState } from 'react';
// import { useMutation } from '@apollo/client';
// import { CREATE_RESERVATION_MUTATION } from './graphql/reservation';

function ReservationPage() {
  const [guestName, setGuestName] = useState('');
  const [guestContactInfo, setGuestContactInfo] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [tableSize, setTableSize] = useState('');

  const [createReservation, { loading, error }] = useMutation(
    CREATE_RESERVATION_MUTATION
  );

  const handleReservation = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createReservation({
        variables: {
          guestName,
          guestContactInfo,
          arrivalTime,
          tableSize,
        },
      });

      // Handle successful reservation
      console.log(data); // Access the response data here
    } catch (error) {
      // Handle reservation error
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Reservation Page</h1>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '1' }}>
          <form onSubmit={handleReservation}>
            <input
              type="text"
              placeholder="Guest Name"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Guest Contact Info"
              value={guestContactInfo}
              onChange={(e) => setGuestContactInfo(e.target.value)}
            />
            <input
              type="text"
              placeholder="Expected Arrival Time"
              value={arrivalTime}
              onChange={(e) => setArrivalTime(e.target.value)}
            />
            <input
              type="text"
              placeholder="Reserved Table Size Info"
              value={tableSize}
              onChange={(e) => setTableSize(e.target.value)}
            />
            <button type="submit">Make Reservation</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReservationPage;