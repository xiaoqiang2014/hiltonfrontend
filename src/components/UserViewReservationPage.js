import React, { useEffect, useState } from "react";
import "./ReservationPage.css"; 

function ReservationPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [guestName, setGuestName] = useState("");
  const [guestContactInfo, setGuestContactInfo] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [tableSize, setTableSize] = useState("");
  const [reservationDate, setReservationDate] = useState("");
  const [orderInfo, setOrderInfo] = useState(null);

 useEffect(() => {
   const fetchReservations = async () => {
     try {
       const token = sessionStorage.getItem('token');
       // Include the token in the request headers
       const headers = {
         Authorization: `Bearer ${token}`,
       };

       const response = await fetch("/reserve/reservations", { headers });
       if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
       }
       const data = await response.json();
       setReservations(data);
       setLoading(false);
     } catch (error) {
       setError(error);
       setLoading(false);
     }
   };

   fetchReservations();
 }, []);

  const handleReservation = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch("/reserve/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          guestName,
          guestContactInfo,
          arrivalTime,
          tableSize,
          reservationDate,
          token,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Reservation successful
      const data = await response.json();
      setOrderInfo(data); // Store order details

      // Reload reservations after making a reservation
      fetchReservations();
    } catch (error) {
      // Handle reservation error
      console.log(error);
    }
  };

  const handleCancelReservation = async (reservationId) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`/reserve/reservations/${reservationId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to cancel reservation: HTTP status ${response.status}`
        );
      }

      // Remove the canceled reservation from the local state
      setReservations((prevReservations) =>
        prevReservations.filter(
          (reservation) => reservation._id !== reservationId
        )
      );

      console.log(`Reservation with ID ${reservationId} has been canceled.`);
    } catch (error) {
      console.error("Error canceling reservation:", error);
    }
  };

  return (
    <div className="fantasy-container">
      <h1 className="fantasy-header">Fantasy Reservation Page</h1>
      <div className="fantasy-form">
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
          <input
            type="text"
            placeholder="Reservation Date"
            value={reservationDate}
            onChange={(e) => setReservationDate(e.target.value)}
          />
          <button className="fantasy-button" type="submit">Make Reservation</button>
        </form>
        </div>

      {loading && <p>Loading reservations...</p>}

      {error && <p>Error fetching reservations: {error.message}</p>}

      <h1>View Reservations</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>{/* Your table header */}</thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation._id}>
              <td>{reservation.guestName}</td>
              <td>{reservation.guestContactInfo}</td>
              <td>{reservation.arrivalTime}</td>
              <td>{reservation.tableSize}</td>
              <td>{reservation.status}</td>
              <td>{reservation.userEmail}</td>
              <td>{reservation.orderTime}</td>
              <td>
                <button
                  onClick={() => handleCancelReservation(reservation._id)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
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

export default ReservationPage;
