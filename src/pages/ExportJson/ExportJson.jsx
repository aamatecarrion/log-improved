import React from 'react'
import DownloadJsonButton from '../../components/DownloadJsonButon/DownloadJsonButton'
import { Typography } from '@mui/material'

const ExportJson = () => {
  return (
    <div>
        <Typography variant="body1" gutterBottom>
        This app stores it's data inside the browser's local storage in JSON format. You can download this data as a JSON file.
      </Typography>

      <DownloadJsonButton></DownloadJsonButton>
    </div>
  )
}

export default ExportJson
