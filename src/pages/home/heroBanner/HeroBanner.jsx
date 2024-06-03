import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles.scss'

export const HeroBanner = () => {
    const [backGround, setBackGround] = useState('')
    const [query, setQuery] = useState('')
    const navigate = useNavigate()

    const handleSearch = (e) => {
        if(e.key === 'Enter' && query.length > 0 ){
            navigate(`/search/${query}`)
        }
    }

    const handleButtonSearch = (e) => {
        if(query.length > 0 ){
            navigate(`/search/${query}`)
        }
    }

    return (
        <div className='heroBanner'>
            <div className="wrapp">
                <div className="heroBannerContext">
                    <div className="title">
                        Welcome
                    </div>
                    <div className="sub-title">
                        Millions of movies. TV shows and people to discover.
                        Explore now.
                    </div>
                    <div className="searchInput">
                        <input type="search" placeholder='Search for a movie or TV show...'
                                onChange = {(e) => setQuery(e.target.value)}
                                onKeyUp={handleSearch}/>
                        <button onClick={handleButtonSearch}>Search</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
