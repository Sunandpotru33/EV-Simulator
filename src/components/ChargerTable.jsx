import React from "react";
import { Trash2 } from "lucide-react";
import "./Charger.css";

const statusIcons = {
  offline: "⛔",
  online: "✅",
  charging: "⚡",
  ready: "🔋",
  fault: "❗",
};

const ChargerTable = ({ chargers, onUpdateStatus, onRemove }) => {
  return (
    <div className="container-fluid px-4">
     <table
  className="table table-dark table-hover shadow-sm text-center"
  style={{ borderCollapse: "separate", borderSpacing: "0 12px" }}
>
        <thead style={{ backgroundColor: "#000", color: "#fff" }}>
          <tr>
            <th style={{ width: "40%" }}>Charger ID</th>
            <th style={{ width: "40%" }}>Change Status</th>
            <th style={{ width: "20%" }}>Remove</th>
          </tr>
        </thead>
        <tbody>
          {chargers.map(({ id, status }) => (
          <tr
          key={id}
          style={{
            border: "1px solid #444",
            borderRadius: "12px",
            overflow: "hidden",
            backgroundColor: "#3a3b3f", 
            
          }}
        >
              <td className="align-middle">{id}</td>
              <td>
                <select
                  className="form-select bg-secondary text-white border-0 text-center"
                  style={{
                    padding: "4px 8px",
                    fontSize: "0.9rem",
                    width: "180px",
                    margin: "auto",
                  }}
                  value={status}
                  onChange={(e) => onUpdateStatus(id, e.target.value)}
                >
                  {Object.keys(statusIcons).map((s) => (
                    <option key={s} value={s} style={{ padding: "6px", textAlign: "left" }}>
                    {`${statusIcons[s]}  ${s.charAt(0).toUpperCase() + s.slice(1)}`}
                  </option>
                  ))}
                </select>
              </td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  style={{ border: "none", background: "transparent" }}
                  onClick={() => onRemove(id)}
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
          {chargers.length === 0 && (
            <tr>
              <td colSpan="3" className="text-muted py-5">
                No chargers added yet. Click <strong>"Add Charger"</strong> to begin.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ChargerTable;
