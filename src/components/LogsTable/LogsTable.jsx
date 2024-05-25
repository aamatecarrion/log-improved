import React from 'react'
import { LocalStorageContext } from '../../contexts/LocalStorageContext'
import './LogsTable.css'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

const Logs = () => {
  const { data, setData } = useContext(LocalStorageContext)
  return (
    <div className='tableWrapper'>
      <table>
        <tbody>
          {data.regs && data.regs.sort((a, b) => b.date - a.date).map((reg) => {
            return (
              <tr key={reg.id}>
                <td>{reg.text}</td>
                <td>{new Date(reg.date).toLocaleString()}</td>
                <td><Link to={`/log/${reg.id}`} >Ver</Link></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Logs
