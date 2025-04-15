import React from "react";
import { Trash2 } from "lucide-react";
import "./Charger.css";

const statusIcons: Record<string, string> = {
  offline: "⛔",
  online: "✅",
  charging: "⚡",
  ready: "🔋",
  fault: "❗",
};

interface Charger {
  id: string;
  status: string;
}

interface ChargerTableProps {
  chargers: Charger[];
  onUpdateStatus: (id: string, status: string) => void;
  onRemove: (id: string) => void;
}

const ChargerTable: React.FC<ChargerTableProps> = ({ chargers, onUpdateStatus, onRemove }) => {
  return (
    <div className="container-fluid px-4">
      <table className="table table-dark table-hover text-center">
        <thead>
          <tr>
            <th className="table-th-40" >Charger ID</th>
            <th className="table-th-40" >Change Status</th>
            <th className="table-th-20" >Remove</th>
          </tr>
        </thead>
        <tbody>
          {chargers.map(({ id, status }) => (
            <tr key={id}>
              <td className="align-middle">{id}</td>
              <td>
                <select
                  className="form-select bg-dark text-white border-1 text-center"
                  value={status}
                  onChange={(e) => onUpdateStatus(id, e.target.value)}
                  aria-label={`Change status of charger ${id}`}
                >
                  {Object.keys(statusIcons).map((s) => (
                    <option key={s} value={s}>
                      {`${statusIcons[s]}  ${s.charAt(0).toUpperCase() + s.slice(1)}`}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => onRemove(id)}
                  aria-label={`Remove charger ${id}`}
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
          {chargers.length === 0 && (
            <tr>
              <td colSpan={3} className="text-muted py-5">
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
