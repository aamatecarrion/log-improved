import React from 'react'

const TimeUnitSelector = (props) => {


    return (
        <div>
            <select
                name="timeUnit"
                value={props.value}
                onChange={props.fatherFunctionProp} >
                <option value="seconds">Segundos</option>
                <option value="minutes">Minutos</option>
                <option value="hours">Horas</option>
                <option value="days">Días</option>
                <option value="months">Meses</option>
                <option value="years">Years</option>
            </select>


        </div>
    )
}

export default TimeUnitSelector
