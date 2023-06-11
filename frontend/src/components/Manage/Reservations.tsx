import axios from "axios";
import { useEffect, useState } from "react";
import "./Reservations.Module.css";

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
      });
  }, []);

  function confirmReservation(adoptionId: string): void {
    axios
      .get("http://localhost:8080/adoptions/confirm?id=" + adoptionId)
      .then((response) => {
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
      <h1 className="title title2">Rezerwacje</h1>
      {reservations.length == 0 && <p>brak rezerwacji do potwierdzenia.</p>}
      {reservations.length != 0 && (
        <div className="titleRow2">
          <p className="id">id rezerwacji</p>
          <p className="adopter">adopter</p>
          <p className="id">id psa</p>
          <p className="dog">imię psa</p>
          <p className="shelter">schronisko</p>
          <div className="button-wrapper"></div>
        </div>
      )}
      <div className="allPlace2">
        {reservations.map((reservation: Adoption) => (
          <div className="myRow2" key={reservation.adoptionId}>
            <p className="id">{reservation.adoptionId}</p>
            <p className="adopter">
              {reservation.adopter.firstName} {reservation.adopter.secondName}
            </p>
            <p className="id">{reservation.dog.id}</p>
            <p className="dog">{reservation.dog.name}</p>
            <p className="shelter">{reservation.dog.shelter.name}</p>
            <div className="button-wrapper">
              <button
                className="myButton2"
                onClick={() => {
                  confirmReservation(reservation.adoptionId);
                }}
              >
                potwierdź
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Reservations;
