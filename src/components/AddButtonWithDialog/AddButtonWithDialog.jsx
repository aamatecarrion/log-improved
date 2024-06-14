import React, { useContext, useEffect, useState, useRef } from "react";
import {
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Autocomplete,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { LocalStorageContext } from "../../contexts/LocalStorageContext";
import useGetUnique from "../../hooks/useGetUnique";

function AddButtonWithDialog() {
  const uniqueSorted = useGetUnique() || []; // Ensure uniqueSorted is never null
  const { data, setData } = useContext(LocalStorageContext);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [text, setText] = useState("");
  const [addMode, setAddMode] = useState(true);
  const autoCompleteRef = useRef(null);

  const handleClick = () => {
    if (addMode) {
      setDialogOpen(true);
    } else {
      scrollUp();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollEvent);

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, []);

  useEffect(() => {
    if (dialogOpen && autoCompleteRef.current) {
      autoCompleteRef.current.focus(); // Focus the text field when the dialog opens
      autoCompleteRef.current.select(); // Select all text when the dialog opens
      autoCompleteRef.current.setSelectionRange(0, 0); // Place the cursor at the beginning of the text when the dialog opens
    }
  }, [dialogOpen]);

  const handleScrollEvent = () => {
    setAddMode(window.scrollY > 100 ? false : true);
  };

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleTextChange = (event, newValue) => {
    if (event && event.target) {
      setText(event.target.value);
    }
  };

  const addLog = () => {
    const trimmedValue = text.trim();
    if (trimmedValue) {
      const newReg = {
        text: trimmedValue,
        id: trimmedValue + "_" + Date.now(),
        date: Date.now(),
      };
      setData({ ...data, regs: [...(data.regs || []), newReg] });
    }
  };

  const handleAdd = () => {
    addLog();
    setDialogOpen(false);
    setText("");
  };

  return (
    <React.Fragment>
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleClick}
        style={{ position: "fixed", bottom: 80, right: 30 }}
      >
        {addMode ? <AddIcon /> : <ArrowUpwardIcon />}
      </Fab>
      <Dialog
        fullWidth={true}
        open={dialogOpen}
        onClose={handleClose}
        PaperProps={{
          style: {
            position: "fixed",
            top: "1px",
          },
        }}
      >
        <DialogTitle>Nuevo registro</DialogTitle>
        <DialogContent>
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            ref={autoCompleteRef}
            options={uniqueSorted}
            inputValue={text || ""} // Ensure text is never null
            onInputChange={handleTextChange}
            onChange={(event, newValue) => setText(newValue || "")} // Ensure newValue is never null
            renderInput={(params) => (
              <TextField
                margin="dense"
                label=""
                inputRef={autoCompleteRef}
                autoFocus
                {...params}
                fullWidth
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleAdd} variant="contained" disabled={!text} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default AddButtonWithDialog;
