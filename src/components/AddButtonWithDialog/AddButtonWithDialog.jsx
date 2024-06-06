import React, { useContext, useState } from 'react';
import { Fab, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { LocalStorageContext } from '../../contexts/LocalStorageContext';

function AddButtonWithDialog() {

    const { data, setData } = useContext(LocalStorageContext);
    const [open, setOpen] = useState(false);
    const [text, setText] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleAdd();
        }
    };

    const addLog = () => {
        const trimmedValue = text.trim();
        if (trimmedValue) {
            const newReg = { text: trimmedValue, id: trimmedValue + "_" + Date.now(), date: Date.now() };
            setData({ ...data, regs: [...data.regs || [], newReg] })
            setText('');
        }

    }

    const handleAdd = () => {
        addLog();
        setOpen(false);
    };

    return (
        <div>
            <Fab color="primary" aria-label="add" onClick={handleClickOpen} style={{ position: 'fixed', bottom: 80, right: 30 }}>
                <AddIcon />
            </Fab>
            <Dialog fullWidth={true} open={open} onClose={handleClose}>
                <DialogTitle>New Log</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Text"
                        type="text"
                        fullWidth
                        value={text}
                        onChange={handleTextChange}
                        onKeyDown={handleKeyDown}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAdd} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddButtonWithDialog;

