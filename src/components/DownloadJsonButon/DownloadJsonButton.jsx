import React, { useContext } from 'react';
import { LocalStorageContext } from '../../contexts/LocalStorageContext';
import { Button } from '@mui/material';


/**
 * DownloadJsonButton component provides a button that, when clicked,
 * downloads a JSON representation of the data object stored in the context.
 */
const DownloadJsonButton = () => {
  const { data, setData } = useContext(LocalStorageContext);

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
    <Button variant="contained" onClick={() => downloadJson(data, `data${Date.now()}.json`)}>Exportar a JSON</Button>
  );
};

export default DownloadJsonButton;