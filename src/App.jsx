import { useState, useEffect } from 'react'
import {fetchDataFromAPI} from "./ultis/api.js"
import './App.css'

function App() {
  const [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter((preCounter) => preCounter + 1);
  }

  useEffect(() => {
    apiTesting();
  }, [])

  const apiTesting = async () => {
    try {
      const data = await fetchDataFromAPI("/search/movie?query=Batman")
      console.log(data);
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
