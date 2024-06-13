import React, { useContext, useEffect, useState } from 'react'
import { LocalStorageContext } from '../contexts/LocalStorageContext'

const useGetUnique = () => {
    const { data } = useContext(LocalStorageContext)
    const [uniqueSorted, setUniqueSorted] = useState([])
    const getUnique = () => {
        const texts = data.regs.map((reg) => reg.text)
        let uniqueTexts = [...new Set(texts)]
        let uniqueSorted = uniqueTexts.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'accent' }));
        setUniqueSorted(uniqueSorted)
    }

    useEffect(() => {
        getUnique()
    }, [data])
    return uniqueSorted
}

export default useGetUnique
