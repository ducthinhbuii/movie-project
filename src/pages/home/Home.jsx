import React from 'react'
import './styles.scss'
import { HeroBanner } from './heroBanner/HeroBanner'

export const Home = () => {
  return (
    <div className='homePage'>
        <HeroBanner />
    </div>
  )
}
