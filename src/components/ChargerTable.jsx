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
      <table className="table table-dark table-striped table-hover border border-secondary shadow-sm rounded text-center">
        <thead className="table-light text-dark">
          <tr>
            <th style={{ width: "25%" }}>Charger ID</th>
            <th style={{ width: "20%" }}>Status</th>
            <th style={{ width: "35%" }}>Change Status</th>
            <th style={{ width: "20%" }}>Remove</th>
          </tr>
        </thead>
        <tbody>
          {chargers.map(({ id, status }) => (
            <tr key={id}>
              <td>{id.slice(0, 8)}...</td>
              <td className="fw-bold">{statusIcons[status]} {status.toUpperCase()}</td>
              <td>
              <select
  className="form-select bg-secondary text-white border-0 py-1 text-center"
  value={status}
  onChange={(e) => onUpdateStatus(id, e.target.value)}
>
  {Object.keys(statusIcons).map((s) => (
    <option key={s} value={s} className="text-center">
      {s.charAt(0).toUpperCase() + s.slice(1)}
    </option>
  ))}
</select>
              </td>
              <td>
                <button className="btn btn-outline-danger" onClick={() => onRemove(id)}>
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
          {chargers.length === 0 && (
            <tr>
              <td colSpan="4" className="text-muted py-5">
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
