import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { LocalStorageContext } from '../../contexts/LocalStorageContext';

const FileUploader = () => {
  const { data, setData } = useContext(LocalStorageContext);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        const uniqueRegs = json.regs.filter(reg => !data.regs.find( existingReg => existingReg.id === reg.id));
        setData({ regs: [...data.regs, ...uniqueRegs] });



        
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    };

    if (file) {
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={() => document.getElementById('fileInput').click()}>
        Select JSON File
      </Button>
      <input
        id="fileInput"
        type="file"
        accept=".json"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileUploader;
