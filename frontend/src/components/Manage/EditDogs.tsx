import axios from "axios";
import React, { useEffect, useState } from "react";
import EditDogForm from "../Forms/EditDogForm";
import "./EditDogs.Module.css";

const EditDogs = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [dogToEdit, setDogToEdit] = useState<Dog>();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/dogs/all")
      .then((response) => {
        setDogs(response.data), setIsLoaded(true);
      })
      .catch((error) => {
        console.error(error);
        // Handle error, set dogs state to an empty array or display an error message
        console.log("error!");
      });
  }, []);

  return (
    <>
      {!dogToEdit && (
        <>
          <h1 className="title title1">Edytuj psy:</h1>
          <div className="allPlace">
            {dogs.map((dog: Dog) => (
              <div className="myRow" key={dog.id}>
                <div className="wrapper1">
                  <h1 className="name-and-id">
                    {dog.name + " "}
                    <small className="text-secondary faded-text name-and-id">
                      /{dog.id}
                    </small>
                  </h1>
                </div>
                <button
                  className="myButton1"
                  onClick={() => {
                    setDogToEdit(dog);
                  }}
                >
                  edytuj
                </button>
              </div>
            ))}
          </div>
        </>
      )}
      {dogToEdit && <EditDogForm dog={dogToEdit} />}
    </>
  );
};

export default EditDogs;
