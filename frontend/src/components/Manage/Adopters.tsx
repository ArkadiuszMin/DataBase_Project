import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Adopters.Module.css";

const Adopters = () => {
  const [adopters, setAdopters] = useState<Adopter[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/adopters/all")
      .then((response) => {
        setAdopters(response.data), setIsLoaded(true);
      })
      .catch((error) => {
        console.error(error);
        // Handle error, set adopters state to an empty array or display an error message
        console.log("error!");
      });
  }, []);

  return (
    <>
      <h1 className="title title1">Adopterzy:</h1>
      <div className="titleRow">
        <p className="rowItem id">id</p>
        <p className="rowItem name-and-surname">imię i nazwisko</p>
        <p className="rowItem email">email</p>
        <p className="rowItem phone">telefon</p>
        <p className="rowItem address">adres</p>
      </div>
      <div className="allPlace1">
        {adopters.map((adopter: Adopter) => (
          <div className="myRow1" key={adopter.id}>
            <p className="rowItem id">{adopter.id}</p>
            <p className="rowItem name-and-surname">
              {adopter.firstName} {adopter.secondName}
            </p>
            <p className="rowItem email">{adopter.email}</p>
            <p className="rowItem phone">{adopter.phone}</p>
            <p className="rowItem address">
              {adopter.street} {adopter.city} {adopter.postalCode}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Adopters;
