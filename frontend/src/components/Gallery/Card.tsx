import "./Gallery.Module.css";

interface Props {
  dog: Dog;
}

const AnimalCard = ({ dog }: Props) => {
  console.log("/details/" + dog.id);
  let route = "/details/" + dog.id;
  return (
    <div className="col">
      <div className="card myCard">
        <div className="image-container" style={{ backgroundColor: "black" }}>
          <a href={route}>
            <img src={dog.imgSrc} alt="Your image description" />
            <div className="image-text" style={{ color: "black" }}>
              Poznaj mnie!
            </div>
          </a>
        </div>
        <div className="card-body">
          <h4 className="card-title">{dog.name}</h4>
          <p className="card-text">
            🐾 {dog.age}lat, {dog.weight}kg, {dog.sex}
          </p>
          <p className="card-text">{dog.state}</p>
        </div>
      </div>
    </div>
  );
};

export default AnimalCard;
