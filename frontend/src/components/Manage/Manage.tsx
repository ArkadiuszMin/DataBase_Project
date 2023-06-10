import { Component, useState } from "react";
import "./Manage.Module.css";
import AddDogForm from "../Forms/AddDogForm";
import Adopters from "./Adopters";

type Tab = {
  name: string;
  component: JSX.Element;
};

const ManagePage = () => {
  const [activeTab, setActiveTab] = useState("");

  const tabs: Tab[] = [
    {
      name: "dodaj psa",
      component: <AddDogForm />,
    },
    {
      name: "edytuj psy",
      component: <AddDogForm />,
    },
    {
      name: "adopterzy",
      component: <Adopters />,
    },
    {
      name: "adopcje",
      component: <AddDogForm />,
    },
    {
      name: "rezerwacje",
      component: <AddDogForm />,
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
