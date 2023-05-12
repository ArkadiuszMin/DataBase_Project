import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./Detail.Module.css";
import PageNotFound from "./PageNotFound";
import From from "./ReservationForm";
const animals: Animal[] = [
  {
    animalID: 1,
    imageSrc:
      "https://cdn.onemars.net/sites/perfect-fit_pl_W7ZCj_JAs8/image/nadpobudliwy-pies_1633946158412.png",
    name: "Kotlecik",
    age: 12,
    wage: 23,
    sex: "samiec",
    breed: "gówniak",
  },
  {
    animalID: 2,
    imageSrc:
      "https://www.rd.com/wp-content/uploads/2022/01/GettyImages-912084898-e1641834261695.jpg",
    name: "pies 2",
    age: 12,
    wage: 44,
    sex: "samiec",
  },
  {
    animalID: 3,
    imageSrc:
      "https://www.thesprucepets.com/thmb/M8YzLEti4ZGmAr5af1BqxJ9Oc14=/1500x0/filters:no_upscale():strip_icc()/top-friendliest-dog-breeds-4691511_hero-5c6a918dcf56409c888d78b0fac82d18.jpg",
    name: "pies 3",
    age: 12,
    wage: 44,
    sex: "samiec",
  },
  {
    animalID: 4,
    imageSrc:
      "https://www.thesprucepets.com/thmb/hxWjs7evF2hP1Fb1c1HAvRi_Rw0=/2765x0/filters:no_upscale():strip_icc()/chinese-dog-breeds-4797219-hero-2a1e9c5ed2c54d00aef75b05c5db399c.jpg",
    name: "pies 4",
    age: 12,
    wage: 44,
    sex: "samiec",
  },
  {
    animalID: 5,
    imageSrc:
      "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*",
    name: "pies 5",
    age: 12,
    wage: 44,
    sex: "samiec",
  },
  {
    animalID: 6,
    imageSrc:
      "https://cdn.onemars.net/sites/perfect-fit_pl_W7ZCj_JAs8/image/nadpobudliwy-pies_1633946158412.png",
    name: "pies 6",
    age: 12,
    wage: 44,
    sex: "samiec",
  },
  {
    animalID: 7,
    imageSrc:
      "https://cdn.onemars.net/sites/perfect-fit_pl_W7ZCj_JAs8/image/nadpobudliwy-pies_1633946158412.png",
    name: "pies 7",
    age: 12,
    wage: 44,
    sex: "samiec",
  },
  {
    animalID: 8,
    imageSrc:
      "https://cdn.onemars.net/sites/perfect-fit_pl_W7ZCj_JAs8/image/nadpobudliwy-pies_1633946158412.png",
    name: "pies 8",
    age: 12,
    wage: 44,
    sex: "samiec",
  },
];
const AnimalDetails = () => {
  const { animalID } = useParams();
  const [animal, setAnimal] = useState<Animal>();

  useEffect(() => {
    if (animalID && isCorrect(parseInt(animalID))) {
      const animal = getAnimal(parseInt(animalID));
      setAnimal(animal);
    }
  }, [animalID]);

  const [showReservationForm, setResrvationForm] = useState(false);

  return (
    <div>
      {!animal && <PageNotFound />}
      {animal && (
        <>
          <div className="container-fluid p-3">
            <div className="row p-4 gap-3">
              <div className="col-md-auto">
                <img
                  className="details-img"
                  src={animal.imageSrc}
                  alt={animal.name}
                />
              </div>
              <div className="col-md-6 continer-fluid position-relative">
                {!showReservationForm && (
                  <>
                    <h1 className="title">
                      {animal.name + " "}
                      <small className="text-secondary faded-text">
                        /{animal.animalID}
                      </small>
                    </h1>

                    <div>
                      <p>wiek: {animal.age}</p>
                      <p>waga: {animal.wage}</p>
                      <p>płeć: {animal.sex}</p>
                      {animal.breed && <p>rasa: {animal.breed}</p>}
                    </div>
                    <div>
                      <h3 className="subtitle">Parę słów o mnie...</h3>
                      <p>
                        Ten piesek ma puszyste białe futerko i czarne uszy. Jest
                        bardzo ruchliwy i energiczny, lubi biegać i bawić się
                        zabawkami. Ma bardzo łagodny i przyjazny charakter,
                        uwielbia towarzystwo ludzi i innych zwierząt. Lubuje się
                        w długich spacerach i uwielbia wąchać kwiaty i trawę.
                      </p>
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
                {showReservationForm && <From />}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

function isCorrect(ID: number): boolean {
  return ID > 0 && ID <= animals.length;
}

function getAnimal(ID: number): Animal {
  return animals[ID - 1];
}

export default AnimalDetails;
