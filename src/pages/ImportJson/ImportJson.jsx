import React from 'react'
import DownloadJsonButton from '../../components/DownloadJsonButon/DownloadJsonButton'
import { Typography } from '@mui/material'
import FileUploader from '../../components/FileUploader/FileUploader'

const ImportJson = () => {
  return (
    <div>
      <Typography variant="body1" gutterBottom>
        Import your JSON file here.
      </Typography>

      <FileUploader></FileUploader>
    </div>
  )
}

export default ImportJson
