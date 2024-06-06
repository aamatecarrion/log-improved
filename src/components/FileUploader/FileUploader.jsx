import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { LocalStorageContext } from '../../contexts/LocalStorageContext';

const FileUploader = () => {
  const { data, setData } = useContext(LocalStorageContext);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const reader = new FileReader();

    const processFile = (file) => {
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
        multiple
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileUploader;

