import { useEffect, useState } from "react";
import "./Home.Module.css";
import axios from "axios";
import PageLoading from "./PageLoading";

const Home = () => {
  const [homeInfo, setHomeInfo] = useState<HomeInfo | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/adoptions/data")
      .then((response) => {
        setHomeInfo(response.data), setIsLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      {isLoaded && (
        <div className="wrapper">
          <div className="constiner home text-center">
            <p className="title">Schronisko Psia Łapka</p>
            <p className="subtitle">
              🐕︎ Ilość zwierzaków w schronisku: {homeInfo?.dogCount}
            </p>
            <p className="subtitle">
              🏠︎ Zadoptowane psiaki: {homeInfo?.adoptedCount}
            </p>
            <p className="subtitle">
              👪🏼 Psi rodzice: {homeInfo?.adoptersCount}
            </p>
            <a href="/dogs">
              <button type="button" className="btn btn-secondary myButton">
                przejdź do zwierzaków!
              </button>
            </a>
          </div>
        </div>
      )}
      {!isLoaded && <PageLoading />}
    </>
  );
};

export default Home;
