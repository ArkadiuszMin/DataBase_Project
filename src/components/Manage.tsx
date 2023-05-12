import { Component, useState } from "react";
import "./Manage.Module.css";
import AddForm from "./AddForm";

type Tab = {
  name: string;
  component: JSX.Element;
};

const ManagePage = () => {
  const [activeTab, setActiveTab] = useState("");

  const tabs: Tab[] = [
    {
      name: "dodaj psa",
      component: (
        <AddForm
          user={undefined}
          onSave={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      ),
    },
    {
      name: "adopterzy",
      component: (
        <AddForm
          user={undefined}
          onSave={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      ),
    },
    {
      name: "rezerwacje",
      component: (
        <AddForm
          user={undefined}
          onSave={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      ),
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
        {/* <div className="row border">
          <div className="col-md-auto nav-aside p-0">
            <div className="list-group nav-aside p-0 m-0">
              {tabs.map((tab, index) => (
                <button
                  type="button"
                  className={
                    activeTab === tab.name
                      ? "active list-group-item list-group-item-action"
                      : "list-group-item list-group-item-action"
                  }
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
              <button
                className="list-group-item placeholder"
                aria-current="true"
              ></button>
            </div>
          </div>
          <div className="col component-container">
            {tabs.map((tab) => (
              <div
                className={activeTab === tab.name ? "d-block" : "d-none"}
                key={tab.name}
              >
                {tab.component}
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </>
  );
};

export default ManagePage;
