import React from 'react'
import './Home.css'
import LogsTable from '../../components/LogsTable/LogsTable'
import { useContext } from 'react'
import { LocalStorageContext } from '../../contexts/LocalStorageContext'
import AddButtonWithDialog from '../../components/AddButtonWithDialog/AddButtonWithDialog'
import CollapsibleTable from '../../components/CollapsibleTable/CollapsibleTable'

const Home = () => {

  
  return (
    <div>
      <CollapsibleTable></CollapsibleTable>
      <AddButtonWithDialog></AddButtonWithDialog>
    </div>

  )
}

export default Home