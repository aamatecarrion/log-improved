import React, { useContext } from 'react';
import { LocalStorageContext } from '../../contexts/LocalStorageContext';
import formatDate from '../../utils/formatDate';
import RegistrosDia from '../RegistrosDia/RegistrosDia';

const getCustomDay = (date) => {
  const day = date.getDay();
  return day === 0 ? 6 : day - 1;
};

const Dia = (props) => {
  const { data } = useContext(LocalStorageContext);
  const registrosDia = data.regs.filter((reg) => formatDate(reg.date) === props.dia);
  const numeroDiaSemana = getCustomDay(new Date(props.dia));
  const color = data && data.colors[numeroDiaSemana];
  
  
  return (
    <React.Fragment>
      <tr style={{ backgroundColor: color }}>
        <td style={{ padding: '5px' }}>
          {new Date(props.dia).toLocaleDateString('es-ES', { weekday: 'long' })}
        </td>
        <td style={{ padding: '5px', textAlign: 'center' }}>{props.dia}</td>
        <td style={{ padding: '5px' }}>{registrosDia.length}</td>
      </tr>
      
      <RegistrosDia registrosDia={registrosDia} color={color} />
    </React.Fragment>
  );
};

export default Dia;

