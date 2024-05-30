import React, { useEffect, useState } from 'react'
import './TimeAgo.css'
import timeAgo from '../../utils/timeAgo'

const TimeAgo = (props) => {
  const [time, setTime] = useState(timeAgo(props.date))

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(timeAgo(props.date))
    }, 100)
    return () => clearInterval(interval)
  }, [props.date])

  return (
    <p>{time}</p>
  )
}

export default TimeAgo

