import React from 'react'
import { useContext } from 'react'
import { LocalStorageContext } from '../../contexts/LocalStorageContext'
import { Link } from 'react-router-dom'
import './Nav.css'

const Nav = () => {

    const { data } = useContext(LocalStorageContext)

    console.log(data)
    return (
        <nav>
            <Link to="/graphs">Graphs</Link>
            <Link to="/buttons">Buttons</Link>
            <Link to="/">Home</Link>
        </nav>
    )
}

export default Nav
