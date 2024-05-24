import React from 'react'
import './Home.css'
import LogsTable from '../../components/LogsTable/LogsTable'
import { useContext } from 'react'
import { LocalStorageContext } from '../../contexts/LocalStorageContext'
import LogInput from '../../components/LogInput/LogInput'
const Home = () => {

  
  return (
    <div>
      <LogsTable></LogsTable>
      <LogInput></LogInput>
    </div>

  )
}

export default Home