import React, { useContext, useState } from 'react';
import { Fab, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { LocalStorageContext } from '../../contexts/LocalStorageContext';
import { useNavigate } from 'react-router-dom';

function EliminarConDialogo(props) {
    const navigate = useNavigate();
    const { data, setData } = useContext(LocalStorageContext);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    const handleEliminar = () => {
        setData({ ...data, regs: data.regs.filter((reg) => reg.id !== props.registro.id) })
        navigate('/')
    };

    return (
        <React.Fragment>
            <Button sx={{ position: 'absolute', right: '8px' }} onClick={handleClickOpen} color='error'>Eliminar</Button>
            <Dialog fullWidth={true} open={open} onClose={handleClose}>
                <DialogTitle>Eliminar registro</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Eliminar el registro "{props.registro.text}"?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleEliminar} color="error">
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default EliminarConDialogo;

