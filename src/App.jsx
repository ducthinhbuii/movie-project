import { useState, useEffect } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {fetchDataFromAPI} from "./ultis/api.js"
import './App.css'
import {useSelector, useDispatch } from 'react-redux';
import { getApiConfiguration, getGenres } from './redux/actions.js';
import { getApiConfigSelector } from './redux/selector.js';

import { Home } from './pages/home/Home.jsx';
import { Details } from './pages/details/Details.jsx';
import { Explore } from './pages/explore/Explore.jsx';
import { SearchResult} from './pages/searchResult/SearchResult.jsx'
import { PageNotFound } from './pages/404/PageNotFound.jsx';
import { Header } from './components/header/Header.jsx'; 
import { Footer } from './components/footer/Footer.jsx';

function App() {
  const dispatch = useDispatch()
  const url = useSelector(getApiConfigSelector)

  useEffect(() => {
    apiTesting();
    genresCall();
  }, [])

  const apiTesting = async () => {
    try {
      const data = await fetchDataFromAPI("/configuration")
      
      const url = {
        backdrop: data.images.secure_base_url + "original",
        poster: data.images.secure_base_url + "original",
        profile: data.images.secure_base_url + "original",
      }

      dispatch(getApiConfiguration(url))
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  const genresCall = async () => {
    const promises = []
    const endPoints = ["tv", "movie"]
    const allGenres = {}

    for (const url of endPoints) {
      const data = await fetchDataFromAPI(`/genre/${url}/list`);
      promises.push(data); // Lấy mảng genres từ data
    }
    // console.log(promises)

    promises.map(({genres}) => {
      return genres.map((item) => (allGenres[item.id] = item));
    })  

    dispatch(getGenres(allGenres))
  
  }

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/:mediaType/:id" element={<Details/>} />
        <Route path="/search/:query" element={<SearchResult/>} />
        <Route path="/explore/:mediaType" element={<Explore/>} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
