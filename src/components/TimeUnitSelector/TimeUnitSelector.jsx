import React from 'react'

const TimeUnitSelector = (props) => {



    return (
        <div>
            <select
                name="timeUnit"
                value={props.value}
                onChange={props.fatherFunctionProp} >
                <option value="seconds">Seconds</option>
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
                <option value="days">Days</option>
                <option value="months">Months</option>
                <option value="years">Years</option>
            </select>


        </div>
    )
}

export default TimeUnitSelector
