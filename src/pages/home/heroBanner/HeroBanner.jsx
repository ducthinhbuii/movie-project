import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector} from 'react-redux'
import './styles.scss'
import useFetch from '../../../hooks/useFetch'
import { getApiConfigSelector } from '../../../redux/selector'
import { Img } from '../../../components/lazyLoadImages/Img'
import { ContentWrapper } from '../../../components/contentWrapper/ContentWrapper'

export const HeroBanner = () => {
    const [background, setBackGround] = useState('')
    const [query, setQuery] = useState('')
    const url = useSelector(getApiConfigSelector)
    const navigate = useNavigate()
    const {data, isLoading} = useFetch("/movie/upcoming")

    useEffect(() => {
        const bg = url.backdrop + data?.results[Math.floor(Math.random() * 20)]?.backdrop_path
        setBackGround(bg)
    }, [data])

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
            { !isLoading && <div className="backdrop-img">
                <Img src={background} />
            </div>}
            <div className="overlay"></div>
            <ContentWrapper>
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
            </ContentWrapper>
        </div>
    )
}
