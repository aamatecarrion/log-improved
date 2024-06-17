import React, { useContext, useState } from 'react'
import { LocalStorageContext } from '../contexts/LocalStorageContext'

const useColors = () => {
    const {data, setData} = useContext(LocalStorageContext)
    const initialColors = data?.colors || {
        colorLunes: "#000",
        colorMartes: "#000",
        colorMiercoles: "#000",
        colorJueves: "#000",
        colorViernes: "#000",
        colorSabado: "#000",
        colorDomingo: "#000",
    }
    const [colors, setColors] = useState(initialColors)

    const handleColorChange = (color, day) => {
        const newColors = {...colors, [day]: color}
        setColors(newColors)
        setData({...data, colors: newColors})
    }

    return {colors, colorChange}
}

export default useColors

