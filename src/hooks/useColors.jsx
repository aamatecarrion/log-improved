import React, { useContext, useEffect, useState } from 'react'
import { LocalStorageContext } from '../contexts/LocalStorageContext'

const useColors = () => {
    const { data, setData } = useContext(LocalStorageContext)
    const initialColors = data?.colors || {
        colorLunes: "#FFF",
        colorMartes: "#FFF",
        colorMiercoles: "#FFF",
        colorJueves: "#FFF",
        colorViernes: "#FFF",
        colorSabado: "#FFF",
        colorDomingo: "#FFF",
    }
    const [colors, setColors] = useState(initialColors)
    useEffect(() => {
        setData({ ...data, colors: colors })
    }, [colors])

    const colorChange = (day, color) => {
        const newColors = { ...colors, [day]: color }
        setColors(newColors)
    }
    return { colors, colorChange }
}

export default useColors

