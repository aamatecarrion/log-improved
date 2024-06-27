import React, { useContext } from 'react'
import { LocalStorageContext } from '../../contexts/LocalStorageContext'
import formatDate from '../../utils/formatDate'
import { useNavigate } from 'react-router-dom'
import formatTime from '../../utils/formatTime';
import useColors from '../../hooks/useColors';

const Dia = (props) => {

    const { data } = useContext(LocalStorageContext)
    const registrosDia = data.regs.filter((reg) => formatDate(reg.date) === props.dia)
    const numeroDiaSemana = new Date(props.dia).getDay()
    const color = data && data.colors[numeroDiaSemana]
    const navigate = useNavigate()
    return (

        <React.Fragment>
            <tr style={{ backgroundColor: color }}>
                <td style={{ padding: '5px' }}>
                    {new Date(props.dia).toLocaleDateString('es-ES', { weekday: 'long' })}
                </td>
                <td style={{ textAlign: 'center' }}>{props.dia}</td>
                <td style={{ textAlign: 'center' }}>{registrosDia.length}</td>
            </tr>

            {registrosDia.sort((a, b) => b.date - a.date).map((registro) => (
                <tr style={{ backgroundColor: color + "50" }} className='registro' onClick={() => navigate(`log/${registro.id}`)} >
                    <td style={{ padding: '5px', textAlign: 'center' }}>{formatTime(registro.date)}</td> 
                    <td colSpan={2}>{registro.text}</td>
                </tr>

            ))}

        </React.Fragment>

    )
}

export default Dia
