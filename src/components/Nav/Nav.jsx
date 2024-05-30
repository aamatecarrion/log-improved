import React from 'react'
import { useContext } from 'react'
import { LocalStorageContext } from '../../contexts/LocalStorageContext'
import { Link } from 'react-router-dom'
import './Nav.css'
import MenuIcon from '@mui/icons-material/Menu';

const Nav = () => {

    const { data } = useContext(LocalStorageContext)

    console.log(data)
    return (
        <nav>
            <div className='menuIconWrapper'>
                <MenuIcon />
            </div>
            <div>
                <Link to="/graphs">Graphs</Link>
                <Link to="/buttons">Buttons</Link>
                <Link to="/">Home</Link>
            </div>
        </nav>
    )
}

export default Nav
