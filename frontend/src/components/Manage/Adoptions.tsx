import axios from "axios";
import { useEffect, useState } from "react";
import PageLoading from "../Pages/PageLoading";
import "./Adoptions.Module.css";

const Adoptions = () => {
  const [adoptions, setAdoptions] = useState<Adoption[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/adoptions/allAdopted")
      .then((response) => {
        setAdoptions(response.data), setIsLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      {isLoaded && (
        <>
          <h4 className="title title4">Adopcje</h4>

          {adoptions.length == 0 && <p>brak adopcji.</p>}
          {adoptions.length != 0 && (
            <div className="titleRow">
              <p className="rowItem id">id adopcji</p>
              <p className="rowItem adopter">adopter</p>
              <p className="rowItem dog">pies</p>
              <p className="rowItem shelter">schronisko</p>
              <p className="rowItem date">data rezerwacji</p>
              <p className="rowItem date">data adopcji</p>
            </div>
          )}

          <div className="allPlace4">
            {adoptions.map((adoption: Adoption) => (
              <div className="myRow4" key={adoption.adoptionId}>
                <p className="rowItem id">{adoption.adoptionId}</p>
                <p className="rowItem adopter">
                  {adoption.adopter.firstName} {adoption.adopter.secondName}
                </p>
                <p className="rowItem dog">{adoption.dog.name}</p>
                <p className="rowItem shelter">{adoption.dog.shelter.name}</p>
                <p className="rowItem date">{adoption.dateReservation}</p>
                <p className="rowItem date">{adoption.dateConfirmation}</p>
              </div>
            ))}
          </div>
        </>
      )}
      {!isLoaded && <PageLoading />}
    </>
  );
};

export default Adoptions;
