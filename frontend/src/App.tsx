import Navbar from "./components/Navbar";
import MyRoutes from "./components/MyRoutes";

type NavbarItems = {
  name: string;
  route: string;
};

function App() {
  const navbarTitles: NavbarItems[] = [
    { name: "home", route: "/" },
    { name: "nasze psiaki", route: "/dogs" },
    { name: "zarządzaj", route: "/manage" },
  ];

  return (
    <>
      <Navbar
        items={navbarTitles}
        rightText="Ty też możesz zostać psim rodzicem!"
        title="Schronisko Psia Łapka"
      ></Navbar>
      <MyRoutes />
    </>
  );
}

export default App;
