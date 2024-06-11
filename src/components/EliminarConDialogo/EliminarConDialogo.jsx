import React, { useContext, useState } from 'react';
import { Fab, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { LocalStorageContext } from '../../contexts/LocalStorageContext';

function EliminarConDialogo(props) {

    const { data, setData } = useContext(LocalStorageContext);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleAdd();
        }
    };

    
    const handleAdd = () => {
        addLog();
        setOpen(false);
    };

    return (
        <div>
            <Button sx={{ position: 'absolute', right: '8px' }} onClick={handleClickOpen} color='error'>Eliminar</Button>
            <Dialog fullWidth={true} open={open} onClose={handleClose}>
                <DialogTitle>Eliminar registro</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Eliminar el registro "{}"
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleAdd} color="primary">
                        Registrar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddButtonWithDialog;

