import "./Gallery.Module.css";

interface Props {
  animal: Animal;
}

const AnimalCard = ({ animal }: Props) => {
  let route = "/details/" + animal.animalID.toString();
  return (
    <div className="col">
      <div className="card myCard">
        <div className="image-container" style={{ backgroundColor: "black" }}>
          <a href={route}>
            <img src={animal.imageSrc} alt="Your image description" />
            <div className="image-text" style={{ color: "black" }}>
              Poznaj mnie!
            </div>
          </a>
        </div>
        <div className="card-body">
          <h4 className="card-title">{animal.name}</h4>
          <p className="card-text">🐕 {animal.breed ?? "kundelek"}</p>
          <p className="card-text">
            🐾 {animal.age}lat, {animal.wage}kg, {animal.sex}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnimalCard;
