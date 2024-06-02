import React from 'react'
import './Home.css'
import LogsTable from '../../components/LogsTable/LogsTable'
import { useContext } from 'react'
import { LocalStorageContext } from '../../contexts/LocalStorageContext'
import AddButtonWithDialog from '../../components/AddButtonWithDialog/AddButtonWithDialog'

const Home = () => {

  
  return (
    <div>
      <LogsTable></LogsTable>
      <AddButtonWithDialog></AddButtonWithDialog>
    </div>

  )
}

export default Home