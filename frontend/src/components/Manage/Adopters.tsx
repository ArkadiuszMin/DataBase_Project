import axios from "axios";
import React, { useEffect, useState } from "react";

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
      <h2>Adopters:</h2>
      {adopters.map((adopter: Adopter) => (
        <p key={adopter.id}>
          {adopter.firstName} {adopter.secondName}
        </p>
      ))}
    </>
  );
};

export default Adopters;
