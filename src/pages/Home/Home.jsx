import React from 'react'
import './Home.css'
import { useContext } from 'react'
import { LocalStorageContext } from '../../contexts/LocalStorageContext'
import LogInput from '../../components/LogInput/LogInput'
const Home = () => {

  
  return (
    <div>
      <LogInput></LogInput>
    </div>

  )
}

export default Home