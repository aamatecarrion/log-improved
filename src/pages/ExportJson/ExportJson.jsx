import React from 'react'
import DownloadJsonButton from '../../components/DownloadJsonButon/DownloadJsonButton'
import { Typography } from '@mui/material'

const ExportJson = () => {
  return (
    <div>
        <Typography variant="body1" gutterBottom>
        Esta aplicación guarda los datos en el almacenamiento local del navegador, estos datos se pueden exportar a un archivo JSON con este botón.
      </Typography>

      <DownloadJsonButton></DownloadJsonButton>
    </div>
  )
}

export default ExportJson
