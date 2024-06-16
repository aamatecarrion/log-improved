import React from 'react'
import DownloadJsonButton from '../../components/DownloadJsonButon/DownloadJsonButton'
import { Box, Typography } from '@mui/material'
import { PinnedPosition } from '@mui/x-data-grid/components/cell/GridCell'

const ExportJson = () => {
  return (
    <Box>
      <Typography variant="body1" gutterBottom>
        Esta aplicación guarda los datos en el almacenamiento local del navegador, estos datos se pueden exportar a un archivo JSON con este botón.
      </Typography>

      <DownloadJsonButton></DownloadJsonButton>
    </Box>
  )
}

export  default ExportJson
