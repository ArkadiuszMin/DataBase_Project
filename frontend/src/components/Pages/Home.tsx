import "./Home.Module.css";

const Home = () => {
  return (
    <div className="wrapper">
      <div className="constiner home text-center">
        <p className="title">Schronisko Psia Łapka</p>
        <p className="subtitle">🐕︎ Ilość zwierzaków w schronisku: 10</p>
        <p className="subtitle">🏠︎ Zadoptowane zwierzaki: 100</p>
        <p className="subtitle">👪🏼 Psi rodzice: 89</p>
        <a href="/dogs">
          <button type="button" className="btn btn-secondary myButton">
            przejdź do zwierzaków!
          </button>
        </a>
      </div>
    </div>
  );
};

export default Home;
