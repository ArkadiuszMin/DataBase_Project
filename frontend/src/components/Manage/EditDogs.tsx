import axios from "axios";
import React, { useEffect, useState } from "react";

const EditDogs = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
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
      <h2>EditDogs:</h2>
      {dogs.map((dog: Dog) => (
        <p key={dog.id}>
          {dog.name} {dog.id}
        </p>
      ))}
    </>
  );
};

export default EditDogs;
