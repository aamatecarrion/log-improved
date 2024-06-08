import React from 'react'
import { useContext } from 'react'
import { LocalStorageContext } from '../../contexts/LocalStorageContext'
import { Link } from 'react-router-dom'
import './Nav.css'
import BasicMenu from '../BasicMenu/BasicMenu'
import { BottomNavigation, BottomNavigationAction, Button, Paper } from '@mui/material'
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';

const Nav = () => {

    const { data } = useContext(LocalStorageContext)

    console.log(data)
    return (
        <nav>
            <BasicMenu />
            <div>
                
                <Button variant="contained" component={Link} sx={{ marginRight: '8px' }} to="/buttons">Botones</Button>
                <Button variant="contained" component={Link} sx={{ marginRight: '16px' }} to="/">Home</Button>
            </div>
        </nav>
    )
}

export default Nav
