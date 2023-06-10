import { useEffect, useState } from "react";
import "./Gallery.Module.css";
import axios from "axios";
import AnimalCard from "./Card";

const AnimalsGallery = () => {
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

  //spit animals
  let dogsInRows: Dog[][] = [];
  let n = dogs.length;
  for (let i = 0; i < n; i++) {
    const index = Math.floor(i / 4);
    if (!dogsInRows[index]) {
      dogsInRows[index] = [];
    }
    dogsInRows[index].push(dogs[i]);
  }
  console.log(dogsInRows);

  if (!isLoaded) {
    return <p>is loading</p>;
  }

  return (
    <>
      <div className="container-fluid" style={{ marginTop: "20px" }}>
        {dogsInRows.map((row, rowIndex) => (
          <div className="row justify-content-around mb-3" key={rowIndex}>
            {row.map((dog) => (
              <AnimalCard key={dog.id} dog={dog} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default AnimalsGallery;
