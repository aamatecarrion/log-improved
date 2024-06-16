import React, { useContext, useEffect, useState, useRef } from "react";
import {
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
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
  const textFieldRef = useRef(null);

  const handleClick = () => {
    if (addMode) {
      setDialogOpen(true);
      setText(""); // Clear the text when opening the dialog
    } else {
      scrollUp();
    }
  };

  // Focus the text field when the dialog opens
  useEffect(() => {
    if (dialogOpen && textFieldRef.current) {
      textFieldRef.current.focus();
    }
  }, [dialogOpen]);

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScrollEvent);
    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, []);

  // Add scroll event handler
  const handleScrollEvent = () => {
    setAddMode(window.scrollY > 10 ? false : true);
  };

  // Update state when autocomplete input changes
  const handleAutocompleteChange = (event, newValue) => {
    setText(newValue);
  };

  // Update state when text field input changes
  const handleTextFieldChange = (event) => {
    setText(event.target.value);
  };

  // Add scroll up function
  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Add dialog close handler
  const handleClose = () => {
    setDialogOpen(false);
    setText(""); // Clear the text when closing the dialog
  };

  // Add log function
  const addLog = () => {
    const trimmedValue = text?.trim();
    if (trimmedValue) {
      const dateNow = Date.now();
      const newReg = {
        text: trimmedValue,
        id: trimmedValue + "_" + dateNow,
        date: dateNow,
      };
      setData({ ...data, regs: [...(data.regs || []), newReg] });
    }
  };

  // Add button click handler
  const handleAdd = () => {
    addLog();
    setDialogOpen(false);
    setText(""); // Clear the text after adding
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAdd();
    }
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
        fullWidth
        open={dialogOpen}
        onClose={handleClose}
        PaperProps={{
          style: {
            position: "fixed",
            top: 0
          },
        }}
      >
        <DialogContent>
          <Autocomplete
            id="free-solo-autocomplete"
            freeSolo
            autoFocus
            onInputChange={handleAutocompleteChange} // Use onInputChange instead of onChange
            inputValue={text} // Bind inputValue to the state
            options={uniqueSorted}
            renderInput={(params) => (
              <TextField
                id="free-solo-text-field"
                margin="dense"
                {...params}
                fullWidth
                inputRef={textFieldRef} // Set the ref to the TextField
                onChange={handleTextFieldChange}
                onKeyDown={handleKeyDown}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAdd} variant="contained" fullWidth disabled={!text} color="primary">
            <AddIcon sx={{ fontSize: "40px" }} />
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default AddButtonWithDialog;
