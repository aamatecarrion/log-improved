import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import ListIcon from '@mui/icons-material/List';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DownloadIcon from '@mui/icons-material/Download';

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant="contained"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MenuIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem component={Link} to="/names" onClick={handleClose} ><ListIcon/>&nbsp;Nombres agrupados</MenuItem>
        <MenuItem component={Link} to="/pruebas" onClick={handleClose}><ScienceOutlinedIcon/>&nbsp;Pruebas</MenuItem>
        <MenuItem component={Link} to="/info" onClick={handleClose}><InfoOutlinedIcon/>&nbsp;Info</MenuItem>
        <MenuItem component={Link} to="/settings" onClick={handleClose}><SettingsIcon/>&nbsp;Configuración</MenuItem>
        <MenuItem component={Link} to="/importjson" onClick={handleClose}><UploadFileIcon/>&nbsp;Importar datos</MenuItem>
        <MenuItem component={Link} to="/exportjson" onClick={handleClose}><DownloadIcon/>&nbsp;Exportar datos</MenuItem>
      </Menu>
    </div>
  );
}