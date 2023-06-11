import { useState } from "react";
import "./Manage.Module.css";
import AddDogForm from "../Forms/AddDogForm";
import Adopters from "./Adopters";
import Reservations from "./Reservations";
import Adoptions from "./Adoptions";
import EditDogs from "./EditDogs";

type Tab = {
  name: string;
  component: JSX.Element;
};

const ManagePage = () => {
  const [activeTab, setActiveTab] = useState("dodaj psa");

  const tabs: Tab[] = [
    {
      name: "dodaj psa",
      component: <AddDogForm />,
    },
    {
      name: "edytuj psy",
      component: <EditDogs />,
    },
    {
      name: "adopterzy",
      component: <Adopters />,
    },
    {
      name: "adopcje",
      component: <Adoptions />,
    },
    {
      name: "rezerwacje",
      component: <Reservations />,
    },
  ];

  return (
    <>
      <div className="myContainer">
        <div className="aside">
          {tabs.map((tab, index) => (
            <button
              type="button"
              className={activeTab === tab.name ? "active button " : "button"}
              aria-current="true"
              onClick={() => {
                setActiveTab(tab.name);
                console.log(activeTab);
              }}
              key={index}
            >
              {tab.name}
            </button>
          ))}
        </div>
        <div className="component-box">
          {tabs.map((tab) => (
            <div
              className={activeTab === tab.name ? "d-block" : "d-none"}
              key={tab.name}
            >
              {tab.component}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ManagePage;
