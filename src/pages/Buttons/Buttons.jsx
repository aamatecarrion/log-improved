import React, { useEffect, useState } from 'react'
import './Buttons.css'
import { useContext } from 'react'
import { LocalStorageContext } from '../../contexts/LocalStorageContext'
import AlertDialog from '../../components/AlertDialog/AlertDialog'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Buttons = () => {
  const { data, setData } = useContext(LocalStorageContext)
  const navigate = useNavigate()
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, []);

  const [buttons, setButtons] = useState([])
  
  useEffect(() => {
    if (data && data.regs) {
      const buttonList = data.regs.map((reg) => reg.text)
      let uniqueButtons = [...new Set(buttonList)]
      let sorted = uniqueButtons.sort(sortByCount)
      setButtons(sorted)
    }

  }, [data])


  const sortByCount = (a, b) => {
    const a_count = data?.regs?.map((reg) => reg.text).filter((text) => text === a).length || 0
    const b_count = data?.regs?.map((reg) => reg.text).filter((text) => text === b).length || 0
    return a_count - b_count
  }

  return (
    <div className='buttonsWrapper'>
      {buttons.map((button) => {
        const handleClick = () => {
          setData({ ...data, regs: [...(data?.regs || []), { text: button, id: button + "_" + Date.now(), date: Date.now() }] });
          navigate('/')
        };
        return <Button variant='contained' sx={{ margin: '8px' }} key={button} onClick={handleClick}>{button}</Button>
      })}
    </div>
  )
}

export default Buttons
