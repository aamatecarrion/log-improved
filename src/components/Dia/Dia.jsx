import React, { useContext } from "react";
import { LocalStorageContext } from "../../contexts/LocalStorageContext";
import formatDate from "../../utils/formatDate";
import RegistrosDia from "../RegistrosDia/RegistrosDia";
import { useNavigate } from "react-router-dom";
import getTextColorForBackground from "../../utils/getTextColorForBackground";
import useColors from "../../hooks/useColors";

import getCustomDay from "../../utils/getCustomDay";


const Dia = (props) => {
  const navigate = useNavigate();
  const { colors, setColors, colorChange } = useColors();

  // cojo el contexto localStorage
  const { data } = useContext(LocalStorageContext);
  
  const registrosDia = data.regs.filter(
    (reg) => formatDate(reg.date) === props.dia
  );
  const numeroDiaSemana = getCustomDay(new Date(props.dia));
  const color = colors[numeroDiaSemana];

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
