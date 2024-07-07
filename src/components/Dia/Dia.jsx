import React, { useContext } from "react";
import { LocalStorageContext } from "../../contexts/LocalStorageContext";
import formatDate from "../../utils/formatDate";
import RegistrosDia from "../RegistrosDia/RegistrosDia";
import { useNavigate } from "react-router-dom";
import getTextColorForBackground from "../../utils/getTextColorForBackground";

const diasSemana = [
  "colorLunes",
  "colorMartes",
  "colorMiércoles",
  "colorJueves",
  "colorViernes",
  "colorSábado",
  "colorDomingo",
];

const getCustomDay = (date) => {
  const day = date.getDay();
  return day === 0 ? 6 : day - 1; // Convertir domingo (0) a 6 y otros días ajustados a 0-5
};


const Dia = (props) => {
  const navigate = useNavigate();

  // cojo el contexto localStorage
  const { data } = useContext(LocalStorageContext);
  
  const registrosDia = data.regs.filter(
    (reg) => formatDate(reg.date) === props.dia
  );
  const numeroDiaSemana = getCustomDay(new Date(props.dia));
  const colorKey = diasSemana[numeroDiaSemana];
  const color = data && data.colors && data.colors[colorKey];

  return (
    <React.Fragment>
      <tr style={{ backgroundColor: color, color: getTextColorForBackground(color) }}>
        <td style={{ padding: "5px" }}>
          {new Date(props.dia).toLocaleDateString("es-ES", { weekday: "long" })}
        </td>
        <td style={{ padding: "5px", textAlign: "center" }}>{props.dia}</td>
        <td style={{ padding: "5px" }}>{registrosDia.length}</td>
        
      </tr>

      <RegistrosDia registrosDia={registrosDia} color={color} />
    </React.Fragment>
  );
};

export default Dia;
