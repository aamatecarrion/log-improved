import React from 'react'
import './Buttons.css'
import { useContext } from 'react'
import { LocalStorageContext } from '../../contexts/LocalStorageContext'

const Buttons = () => {
  const { data, setData } = useContext(LocalStorageContext)
  


  return (
    <div>
      {data.regs.map((reg) => {
        const handleClick = () => {
          setData({ ...data, regs: [...data.regs, { text: reg.text, id: crypto.randomUUID(), date: new Date() }] });
        };
        
        return <button key={reg.id} onClick={handleClick}>{reg.text}</button>;
      })}
    </div>
  )
}

export default Buttons