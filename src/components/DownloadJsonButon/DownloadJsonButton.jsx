import React, { useContext } from 'react';
import { LocalStorageContext } from '../../contexts/LocalStorageContext';
import { Box, Button } from '@mui/material';



/**
 * DownloadJsonButton component provides a button that, when clicked,
 * downloads a JSON representation of the data object stored in the context.
 */
const DownloadJsonButton = () => {
  const { data, setData } = useContext(LocalStorageContext);
  const printFilenameDate = () => {
    const date = new Date();
    const weekday = new Intl.DateTimeFormat(undefined, { weekday: 'long' }).format(date);
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
    const formattedDate = `${year}-${month}-${day}_${hours}-${minutes}-${seconds}_${milliseconds}_${weekday}`;
    return formattedDate
  }
  /**
   * Converts the provided data object to a JSON string and triggers
   * a download of the JSON as a file with the specified filename.
   * 
   * @param {Object} jsonData - The data to be converted to JSON and downloaded.
   * @param {string} filename - The name of the file to be downloaded.
   */
  const downloadJson = (jsonData, filename) => {
    const jsonStr = JSON.stringify(jsonData, null, 2); // Convert object to JSON string
    const blob = new Blob([jsonStr], { type: 'application/json' }); // Create a Blob from JSON string
    const url = URL.createObjectURL(blob); // Create a URL for the Blob

    const link = document.createElement('a'); // Create an <a> element
    link.href = url; // Set href to Blob URL
    link.download = filename; // Set the download attribute with the desired filename
    document.body.appendChild(link); // Append the link to the body
    link.click(); // Programmatically click the link to trigger download
    document.body.removeChild(link); // Remove the link from the body
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', height: '60vh' }}>
      <Button variant="contained" onClick={() => downloadJson(data, `data_log-improved_${printFilenameDate()}.json`)} sx={{
        width: '300px', // Ajusta el tamaño del botón
        height: '300px',
        borderRadius: '50%', // Hace el botón redondo
        fontSize: '30px', // Ajusta el tamaño del texto
      }}>Exportar a JSON</Button>
    </Box>
  );
};

export default DownloadJsonButton;