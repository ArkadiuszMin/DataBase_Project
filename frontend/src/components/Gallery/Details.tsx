import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./Detail.Module.css";
import PageNotFound from "../Pages/PageNotFound";
import Form from "../Forms/AddReservationForm";
import PageLoading from "../Pages/PageLoading";

const AnimalDetails = () => {
  const { dogId } = useParams();
  const [dog, setDog] = useState<Dog | null>(null);
  const [showReservationForm, setResrvationForm] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/dogs/byId?id=" + dogId)
      .then((response) => {
        setDog(response.data), setIsLoaded(true);
        console.log(dog?.state);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      {isLoaded && !dog && <PageNotFound />}
      {isLoaded && dog && (
        <>
          <div className="container-fluid p-3">
            <div className="row p-4 gap-3">
              <div className="col-md-auto">
                <img className="details-img" src={dog.imgSrc} alt={dog.name} />
              </div>
              <div className="col-md-6 continer-fluid position-relative">
                {!showReservationForm && (
                  <>
                    <h1 className="title">
                      {dog.name + " "}
                      <small className="text-secondary faded-text">
                        /{dog.id}
                      </small>
                    </h1>

                    <div>
                      <p>wiek: {dog.age}</p>
                      <p>waga: {dog.weight}</p>
                      <p>płeć: {dog.sex}</p>
                    </div>
                    <div>
                      <h3 className="subtitle">
                        Jestem wyjątkowy, co musisz o mnie wiedzieć?
                      </h3>
                      <p>{dog.description}</p>
                    </div>

                    {dog.state == "NIEZAREZERWOWANY" && (
                      <div className="position-absolute bottom-0">
                        <button
                          type="button"
                          className="btn btn-secondary myButton"
                          onClick={() => setResrvationForm(true)}
                        >
                          wypełnij formularz adopcyjny!
                        </button>
                      </div>
                    )}

                    {(dog.state == "ZAADOPTOWANY" ||
                      dog.state == "ZAREZERWOWANY") && (
                      <p
                        style={{ color: "red" }}
                        className="position-absolute bottom-0"
                      >
                        Nie można dokonać rezerwacji pieska - jest zarezerwowany
                        lub zaadoptowany.
                      </p>
                    )}
                  </>
                )}
                {showReservationForm && dogId && <Form dogId={dogId} />}
              </div>
            </div>
          </div>
        </>
      )}
      {!isLoaded && <PageLoading />}
    </div>
  );
};

export default AnimalDetails;
