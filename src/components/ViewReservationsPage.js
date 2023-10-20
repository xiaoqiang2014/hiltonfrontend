import React, { useEffect, useState } from "react";

function ViewReservationsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reservations, setReservations] = useState([]);

  const fetchReservations = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch("/reserve/allreservations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleSearch = () => {
    // Implement search functionality here
    // You can make a new fetch request or filter the existing reservations based on your search criteria
  };

  if (loading) {
    return <p>Loading reservations...</p>;
  }

  if (error) {
    return <p>Error fetching reservations: {error.message}</p>;
  }

  return (
    <div>
      <h1>View Reservations Page</h1>
      <button
        onClick={handleSearch}
        style={{
          padding: "5px 10px",
          backgroundColor: "blue",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Search
      </button>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>{/* Your table header */}</thead>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewReservationsPage;
