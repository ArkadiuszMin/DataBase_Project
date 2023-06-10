import axios from "axios";
import React, { useEffect, useState } from "react";

const Adoptions = () => {
  const [adoptions, setAdoptions] = useState<Adoption[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/adoptions/all")
      .then((response) => {
        setAdoptions(response.data), setIsLoaded(true);
      })
      .catch((error) => {
        console.error(error);
        // Handle error, set adoptions state to an empty array or display an error message
        console.log("error!");
      });
  }, []);

  return (
    <>
      <h2>Adoptions</h2>
      {adoptions.map((adoption: Adoption) => (
        <p key={adoption.adoptionId}>{adoption.adoptionId}</p>
      ))}
    </>
  );
};

export default Adoptions;
