import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./Detail.Module.css";
import PageNotFound from "../Pages/PageNotFound";
import Form from "../Forms/AddReservationForm.Module";

const AnimalDetails = () => {
  const { dogId } = useParams();
  console.log("id:" + dogId);
  const [dog, setDog] = useState<Dog | null>(null);
  const [showReservationForm, setResrvationForm] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/dogs/byId?id=" + dogId)
      .then((response) => {
        setDog(response.data);
      })
      .catch((error) => {
        console.error(error);
        // Handle error, set dogs state to an empty array or display an error message
        console.log("error!");
      });
  }, []);

  return (
    <div>
      {!dog && <PageNotFound />}
      {dog && (
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
                      {/* {dog.breed && <p>rasa: {dog.breed}</p>} */}
                    </div>
                    <div>
                      <h3 className="subtitle">Parę słów o mnie...</h3>
                      <p>{dog.description}</p>
                    </div>
                    <div>
                      <h5 className="subtitle">
                        Jestem wyjątkowy, co musisz o mnie wiedzieć?
                      </h5>
                      <p>
                        Czasami stresuje mnie głośne otoczenie, więc potrzebuję
                        chwili dla siebie w cichym, spokojnym miejscu
                      </p>
                    </div>
                    <div className="position-absolute bottom-0">
                      <button
                        type="button"
                        className="btn btn-secondary myButton"
                        onClick={() => setResrvationForm(true)}
                      >
                        wypełnij formularz adopcyjny!
                      </button>
                    </div>
                  </>
                )}
                {showReservationForm && dogId && <Form dogId={dogId} />}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AnimalDetails;
