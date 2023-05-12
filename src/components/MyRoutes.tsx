import { BrowserRouter, Route, Routes } from "react-router-dom";
import AnimalsGallery from "./Gallery";
import AnimalDetails from "./Details";
import Home from "./Home";
import Contact from "./Contact";
import Manage from "./Manage";

const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/dogs" element={<AnimalsGallery />}></Route>
        <Route path="/details">
          <Route index element={<AnimalDetails />}></Route>
          <Route path=":animalID" element={<AnimalDetails />}></Route>
        </Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/manage" element={<Manage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
