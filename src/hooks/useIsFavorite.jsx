import React, { useContext, useEffect, useState } from 'react'
import { LocalStorageContext } from '../contexts/LocalStorageContext'

const useIsFavorite = (text) => {
    const {data, setData} = useContext(LocalStorageContext)
    const [isFavorite, setIsFavorite] = useState(data?.favs?.includes(text) || false);

    useEffect(() => {
        if (isFavorite) {
            setData({...data, favs: [...data.favs || [], text]})
        } else {
            setData({...data, favs: data?.favs?.filter((fav) => fav !== text)})
        }
        
    }, [isFavorite])
  
    return {isFavorite, setIsFavorite}
}

export default useIsFavorite