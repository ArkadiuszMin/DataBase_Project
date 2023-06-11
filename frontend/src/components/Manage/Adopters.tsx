import axios from "axios";
import { useEffect, useState } from "react";
import "./Adopters.Module.css";
import PageLoading from "../Pages/PageLoading";

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
      });
  }, []);

  return (
    <>
      {isLoaded && (
        <>
          <h1 className="title title1">Adopterzy:</h1>
          <div className="titleRow">
            <p className="rowItem id">id</p>
            <p className="rowItem name-and-surname">imię i nazwisko</p>
            <p className="rowItem email">email</p>
            <p className="rowItem phone">telefon</p>
            <p className="rowItem address">adres</p>
          </div>
          {adopters.length == 0 && <p>brak adopterów.</p>}

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
      )}
      {!isLoaded && <PageLoading />}
    </>
  );
};

export default Adopters;
