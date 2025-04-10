import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import ChargerTable from "./components/ChargerTable";

import "./App.css";

const App = () => {
  const [chargers, setChargers] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("ev_chargers");
    if (stored) setChargers(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("ev_chargers", JSON.stringify(chargers));
  }, [chargers]);

  const addCharger = () => {
    setChargers([...chargers, { id: uuidv4(), status: "offline" }]);
  };

  const updateStatus = (id, status) => {
    setChargers(chargers.map((c) => (c.id === id ? { ...c, status } : c)));
  };

  const removeCharger = (id) => {
    setChargers(chargers.filter((c) => c.id !== id));
  };

  return (
    <div className="app-wrapper bg-dark text-white min-vh-100 d-flex flex-column">
      <header className="d-flex justify-content-between align-items-center p-4 border-bottom border-secondary">
        <h2 className="m-0">⚡ EV Charger Simulator</h2>
        <button className="btn btn-success" onClick={addCharger}>
          + Add Charger
        </button>
      </header>

      <main className="flex-fill p-4">
        <ChargerTable
          chargers={chargers}
          onUpdateStatus={updateStatus}
          onRemove={removeCharger}
        />
      </main>
    </div>
  );
};

export default App;
