import { useState } from 'react'
import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const addCharger = () => {
    setChargers([
      ...chargers,
      { id: uuidv4(), state: "offline" }
    ]);
  };

  return (
    <>
       <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">⚡ EV Charger Simulator</h1>
      <button onClick={addCharger} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mb-6">
        ➕ Add Charger
      </button>
      {/* <ChargerTable chargers={chargers} onUpdate={updateCharger} onRemove={removeCharger} /> */}
    </div>
    </>
  )
}

export default App
