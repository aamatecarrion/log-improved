import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import "./Names.css";
import { LocalStorageContext } from "../../contexts/LocalStorageContext";
import useGetUnique from "../../hooks/useGetUnique";
import ScrollUp from "../../components/ScrollUp/ScrollUp";

export default function Names() {
  const navigate = useNavigate();
  const uniqueRegs = useGetUnique([]);
  const { data } = useContext(LocalStorageContext);

  const count = (uniqueReg) => {
    return data.regs.filter((reg) => reg.text === uniqueReg).length;
  };

  const rows = uniqueRegs.map((reg) => {
    return { id: reg, count: count(reg) };
  });

  const handleRowClick = (row) => {
    const registros = data.regs.filter((reg) => reg.text === row.id);

    const registroReciente = registros.reduce(
      (a, b) => (a.date > b.date ? a : b),
      { date: 0 }
    );
    navigate(`/log/${registroReciente.id}`);
  };

  return (
    <div>
      <table className="tablaNombres">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Nº de veces</th>
          </tr>
        </thead>
        <tbody>
          {rows
            .sort((a, b) => b.count - a.count)
            .map((row) => (
              <tr
                style={{ cursor: "pointer" }}
                key={row.id}
                onClick={() => handleRowClick(row)}
              >
                <td>{row.id}</td>
                <td>{row.count}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <ScrollUp></ScrollUp>
    </div>
  );
}
