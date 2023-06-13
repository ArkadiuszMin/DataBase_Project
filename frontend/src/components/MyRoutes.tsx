import { BrowserRouter, Route, Routes } from "react-router-dom";
import AnimalsGallery from "./Gallery/Gallery";
import AnimalDetails from "./Gallery/Details";
import Home from "./Pages/Home";
import Manage from "./Manage/Manage";

const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/dogs" element={<AnimalsGallery />}></Route>
        <Route path="/details">
          <Route index element={<AnimalDetails />}></Route>
          <Route path=":dogId" element={<AnimalDetails />}></Route>
        </Route>
        <Route path="/manage" element={<Manage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
