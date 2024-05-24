import React from 'react'
import { LocalStorageContext } from '../../contexts/LocalStorageContext'
import './LogsTable.css'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { LocalStorageProvider } from '../../contexts/LocalStorageContext'
const Logs = () => {
    const { data, setData } = useContext(LocalStorageContext)
    return (
    <table>
      <tbody>
        {data.regs && data.regs.map((reg) => {
          return (
            <tr key={reg.id}>
              <td>{reg.id}</td>
              <td>{reg.text}</td>
              <td>{reg.date.toLocaleString()}</td>
              <td><Link to={`/log/${reg.id}`} >Ver</Link></td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Logs
