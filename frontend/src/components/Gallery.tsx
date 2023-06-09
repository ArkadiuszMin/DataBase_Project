import AnimalCard from "./Card";
import "./Gallery.Module.css";

const animals: Animal[] = [
  {
    animalID: 1,
    imageSrc:
      "https://cdn.onemars.net/sites/perfect-fit_pl_W7ZCj_JAs8/image/nadpobudliwy-pies_1633946158412.png",
    name: "pies 1",
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

const AnimalsGallery = () => {
  // TODO: what if animals is empty?

  //spit animals
  let animalsInRows: Animal[][] = [];
  let n = animals.length;
  for (let i = 0; i < n; i++) {
    const index = Math.floor(i / 4);
    if (!animalsInRows[index]) {
      animalsInRows[index] = [];
    }
    animalsInRows[index].push(animals[i]);
  }
  console.log(animalsInRows);

  return (
    <>
      <div className="container-fluid" style={{ marginTop: "20px" }}>
        {animalsInRows.map((row, rowIndex) => (
          <div className="row justify-content-around mb-3" key={rowIndex}>
            {row.map((animal) => (
              <AnimalCard key={animal.name} animal={animal} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default AnimalsGallery;
