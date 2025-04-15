import React, { useState, useEffect, useCallback } from "react";
import ChargerTable from "./components/ChargerTable";
import "./App.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";


interface Charger {
  id: string;
  status: string;
}

const App = () => {
  const [chargers, setChargers] = useState<Charger[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loaded, SetLoaded] = useState(false);

  useEffect(() => {
      try {
        const stored = localStorage.getItem("ev_chargers");
        if (stored) setChargers(JSON.parse(stored));
      } catch (e) {
        setError("Failed to load chargers from localStorage.");
      } finally {
        setLoading(false);
        SetLoaded(true);
      }
  }, []);

  const updateLocalStorage = useCallback(() => {
    if (!loaded) return;
    try {
      localStorage.setItem("ev_chargers", JSON.stringify(chargers));
    } catch (e) {
      setError("Failed to save chargers to localStorage.");
    }
  }, [chargers, loaded]);

  useEffect(() => {
    updateLocalStorage();
  }, [chargers]);

  const generateShortId = (): string => {
    return "CHG-" + Math.random().toString(36).substr(2, 6).toUpperCase();
  };

  const validateStatus = (status) => {
    const validStatuses = ["offline", "online", "charging", "ready", "fault"];
    return validStatuses.includes(status);
  };

  const addCharger = () => {
    setChargers((prevChargers) => [
      ...prevChargers,
      { id: generateShortId(), status: "offline" },
    ]);
  };

  const updateStatus = (id: string, status: string) => {
    if (!validateStatus(status)) {
      setError("Invalid status value.");
      return;
    }
    setChargers((prevChargers) =>
      prevChargers.map((c) => (c.id === id ? { ...c, status } : c))
    );
  };

  const removeCharger = (id: string) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this charger?",
      buttons: [
        {
          label: "Yes",
          onClick: () => setChargers(chargers.filter((c) => c.id !== id)),
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <div className="app-wrapper bg-dark text-white min-vh-100 d-flex flex-column">
      <header className="d-flex justify-content-between align-items-center p-4 border-bottom border-secondary">
        <h2 className="m-0">⚡ EV Charger Simulator</h2>
        <button className="btn btn-success" onClick={addCharger} aria-label="Add new charger">
          + Add Charger
        </button>
      </header>

      <main className="flex-fill px-4">
        { loading && <p className="text-center mt-5">Loading...</p> }
        { error && <p className="text-danger text-center mt-5">{error}</p> }
        {
          !error && !loading &&
          <ChargerTable
            chargers={chargers}
            onUpdateStatus={updateStatus}
            onRemove={removeCharger}
          />
        }
      </main>
    </div>
  );
};

export default App;