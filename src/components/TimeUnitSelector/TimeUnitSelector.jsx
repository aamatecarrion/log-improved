import { NativeSelect } from '@mui/material'
import React from 'react'

const TimeUnitSelector = (props) => {


    return (
        <div>
            <NativeSelect
                name="timeUnit"
                value={props.value}
                onChange={props.fatherFunctionProp} >
                <option value="segundos">segundos</option>
                <option value="minutos">minutos</option>
                <option value="horas">horas</option>
                <option value="dias">días</option>
                <option value="meses">meses</option>
                <option value="anyos">años</option>
            </NativeSelect>


        </div>
    )
}

export default TimeUnitSelector
