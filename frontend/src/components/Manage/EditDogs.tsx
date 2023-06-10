import axios from "axios";
import React, { useEffect, useState } from "react";
import EditDogForm from "../Forms/EditDogForm";

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
        <div>
          <h2>EditDogs:</h2>
          {dogs.map((dog: Dog) => (
            <div key={dog.id}>
              <p>
                {dog.name} {dog.id}
              </p>
              <button
                onClick={() => {
                  console.log("clicked: " + dog.name);
                  setDogToEdit(dog);
                }}
              >
                edit
              </button>
            </div>
          ))}
        </div>
      )}
      {dogToEdit && <EditDogForm dog={dogToEdit} />}
    </>
  );
};

export default EditDogs;
