import React from 'react'
import { useNavigate } from 'react-router-dom'
import formatTime from '../../utils/formatTime'

const RegistrosDia = (props) => {
    const navigate = useNavigate()
    
    if (!props.registrosDia) {
        return null
    }
    
    const registrosDiaSorted = props.registrosDia
        .filter(registro => registro !== null)
        .sort((a, b) => b.date - a.date)
    
    return (
        <React.Fragment>
            {registrosDiaSorted.length > 0 ?
                registrosDiaSorted.map((registro) => (
                    <tr key={registro.id} style={{ backgroundColor: props.color + "50" }} onClick={() => navigate(`log/${registro.id}`)} >
                        <td style={{ textAlign: 'center' }}>{formatTime(registro.date)}</td>
                        <td colSpan={2} style={{ padding: '5px' }}>{registro.text}</td>
                    </tr>
                ))
            : 
            <tr style={{ backgroundColor: props.color + "50" }}>
                <td style={{ textAlign: 'center', padding: '5px' }}>-</td>
                <td colSpan={2} style={{ textAlign: 'center', padding: '5px' }}>-</td>
            </tr>
            }
        </React.Fragment>
    )
}

export default RegistrosDia

