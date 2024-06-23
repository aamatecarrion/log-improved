import React from 'react'
import useColors from '../../hooks/useColors'

const Settings = () => {
    const {colors, colorChange} = useColors()
  return (
    <React.Fragment>
    <div>
      <p>Esto está en proceso de construcción, se supone que es para elegir el color de fondo de cada día de la semana</p>
      {Object.entries(colors).map(([day, color]) => (
        <div key={day}>
          <label>{day.replace('color', '')}:</label>
          <input
            type="color"
            value={color}
            onChange={(e) => colorChange(day, e.target.value)}
          />
        </div>
      ))}

    </div>

    </React.Fragment>
  )
}

export default Settings
