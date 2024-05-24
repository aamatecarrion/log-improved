import React from 'react'
import { useContext } from 'react'
import { LocalStorageContext } from '../../contexts/LocalStorageContext'

const Nav = () => {

    const { data } = useContext(LocalStorageContext)

    console.log(data)
    return (
        <div>

        </div>
    )
}

export default Nav
