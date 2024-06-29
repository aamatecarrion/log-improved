import * as React from 'react';
import './LogsTable.css';
import { useContext } from 'react';
import { LocalStorageContext } from '../../contexts/LocalStorageContext';
import getDatesFromTimestamp from '../../utils/getDatesFromTimestamp';
import Dia from '../Dia/Dia';

export default function LogsTable() {
  const { data } = useContext(LocalStorageContext);

  if (!data?.regs) {
    return <h3>No hay registros</h3>;
  }

  const todosLosDias = getDatesFromTimestamp(data.regs[0].date)
  
  return (

    <table style={{ width: '95vw', margin: "auto", userSelect: 'none', marginBottom: '300px' }} className='dias'>
      <tbody>
        {todosLosDias.reverse().map((dia) => (
          <Dia key={dia} dia={dia}></Dia>

        ))}
      </tbody>
    </table>
  );
}

