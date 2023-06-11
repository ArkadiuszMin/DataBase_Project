import axios from "axios";
import { useEffect, useState } from "react";
import PageLoading from "../Pages/PageLoading";

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
      });
  }, []);

  return (
    <>
      {isLoaded && (
        <>
          <h2>Adoptions</h2>
          {adoptions.length == 0 && <p>brak adopcji.</p>}
          {adoptions.map((adoption: Adoption) => (
            <p key={adoption.adoptionId}>{adoption.adoptionId}</p>
          ))}
        </>
      )}
      {!isLoaded && <PageLoading />}
    </>
  );
};

export default Adoptions;
