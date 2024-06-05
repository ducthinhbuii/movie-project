import React from 'react'
import './styles.scss'
import { HeroBanner } from './heroBanner/HeroBanner'
import { Trending } from './trending/Trending'

export const Home = () => {
  return (
    <div className='homePage'>
        <HeroBanner />
        <Trending />
        <div style = {{height: 1000}}></div>
    </div>
  )
}
