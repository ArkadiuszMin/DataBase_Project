import axios from "axios";
import React, { useEffect, useState } from "react";

const Reservations = () => {
  const [reservations, setReservations] = useState<Adoption[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/adoptions/toConfirm")
      .then((response) => {
        setReservations(response.data), setIsLoaded(true);
      })
      .catch((error) => {
        console.error(error);
        // Handle error, set reservations state to an empty array or display an error message
        console.log("error!");
      });
  }, []);

  function confirmReservation(adoptionId: string): void {
    axios
      .get("http://localhost:8080/adoptions/confirm?id=" + adoptionId)
      .then((response) => {
        console.log("RESPONSE: " + response.data);

        // Filter out the confirmed reservation from the reservations list
        setReservations((prevReservations) =>
          prevReservations.filter(
            (reservation) => reservation.adoptionId !== adoptionId
          )
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <h2>Reservations</h2>
      {reservations.map((reservation: Adoption) => (
        <div key={reservation.adoptionId}>
          <p>{reservation.adoptionId}</p>
          <button onClick={() => confirmReservation(reservation.adoptionId)}>
            confirm
          </button>
        </div>
      ))}
    </>
  );
};

export default Reservations;
