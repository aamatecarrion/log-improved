import React from 'react'
import DownloadJsonButton from '../../components/DownloadJsonButon/DownloadJsonButton'
import { Typography } from '@mui/material'
import FileUploader from '../../components/FileUploader/FileUploader'

const ImportJson = () => {
  return (
    <div>
      <Typography variant="body1" gutterBottom>
        Importa aquí tus datos exportados en JSON. Puedes seleccionar tantos archivos JSON como quieras, la aplicación se encargará de mezclarlos.
      </Typography>

      <FileUploader></FileUploader>
    </div>
  )
}

export default ImportJson
