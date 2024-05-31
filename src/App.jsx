import { useState, useEffect } from 'react'
import {fetchDataFromAPI} from "./ultis/api.js"
import './App.css'

function App() {
  useEffect(() => {
    console.log("start")
    apiTesting();
    console.log("end")
  }, [])

  const apiTesting = async () => {
    try {
      
      console.log("API TEST")
      const data = await fetchDataFromAPI("/search/movie?query=Batman")
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  return (
    <>
      <div className='App'>
        App
      </div>
    </>
  )
}

export default App
