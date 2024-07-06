import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { LocalStorageContext } from '../../contexts/LocalStorageContext';

const FileUploader = () => {
  const { data, setData } = useContext(LocalStorageContext);

  const handleFileChange = (event) => {
    const files = event.target.files;

    const processFile = (file) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          const existingRegs = data?.regs || [];
          const uniqueRegs = json.regs.filter(
            (reg) => !existingRegs.find((existingReg) => existingReg.id === reg.id)
          );
          setData({ colors: data.colors, regs: [...existingRegs, ...uniqueRegs] });
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      };

      reader.onerror = (e) => {
        console.error("Error reading file:", e);
      };

      if (file) {
        reader.readAsText(file);
      }
    };

    Array.from(files).forEach(processFile);
  };

  return (
    <div>
      <Button variant="contained" onClick={() => document.getElementById('fileInput').click()}>
        Seleccionar archivos JSON
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
