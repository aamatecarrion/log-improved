import * as React from "react";
import "./LogsTable.css";
import { useContext } from "react";
import { LocalStorageContext } from "../../contexts/LocalStorageContext";
import getDatesFromTimestamp from "../../utils/getDatesFromTimestamp";
import Dia from "../Dia/Dia";

export default function LogsTable() {
  const { data } = useContext(LocalStorageContext);

  if (!data?.regs) {
    return <h3>No hay registros</h3>;
  }

  function timeMasChiquito() {
    const objects = data.regs;
    if (objects.length === 0) {
      return null;
    }
    let minObject = objects[0];

    for (let i = 1; i < objects.length; i++) {
      if (objects[i].date < minObject.date) {
        minObject = objects[i];
      }
    }
    return minObject.date;
  }
  const todosLosDias = getDatesFromTimestamp(timeMasChiquito());

  return (
    <table
      style={{
        width: "95vw",
        margin: "auto",
        userSelect: "none",
        marginBottom: "300px",
      }}
      className="tablaDias"
    >
      <tbody>
        {todosLosDias.reverse().map((dia) => (
          <Dia key={dia} dia={dia}></Dia>
        ))}
      </tbody>
    </table>
  );
}
