import React, { useEffect, useState } from 'react'
import totalTimeAgo from '../../utils/totalTimeAgo'

const TotalTimeAgo = (props) => {
  const [timeAgo, setTimeAgo] = useState(totalTimeAgo(props.date, props.unit))

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(totalTimeAgo(props.date, props.unit))
    }, 10)
    return () => clearInterval(interval)
  }, [props.date, props.unit])

  return (
    <p>{timeAgo}</p>
  )
}

export default TotalTimeAgo

