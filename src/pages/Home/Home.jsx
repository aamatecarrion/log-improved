import React from 'react'
import './Home.css'
import AddButtonWithDialog from '../../components/AddButtonWithDialog/AddButtonWithDialog'
import LogsTable from '../../components/LogsTable/LogsTable'

const Home = () => {

  
  return (
    <div>
      <LogsTable></LogsTable>
      <AddButtonWithDialog></AddButtonWithDialog>
    </div>

  )
}

export default Home