import React from 'react'
import './styles.scss'
import { useSelector } from 'react-redux'
import { getApiConfigSelector } from '../../redux/selector'
import { useNavigate } from 'react-router-dom'
import { Img } from '../lazyLoadImages/Img'
import CircleRating from '../circleRating/CircleRating'
import { Genres } from '../genres/Genres'
import dayjs from 'dayjs'

export const MovieCard = ({key, data, fromSearch}) => {
    const url = useSelector(getApiConfigSelector);
    const poster_url = data.poster_path ? url.poster + data.poster_path :
        'https://raw.githubusercontent.com/ShariqAnsari88/movix/main/src/assets/no-poster.png'

    const navigate = useNavigate()
    return (
        <span className='movie-card'>
            <div className="carousel-item"
                key={data.id}
                onClick={() => navigate(`/${data.media_type || endpoint}/${data.id}`)}>
                <div className="poster-block">
                    <Img src={poster_url}/>
                    <CircleRating rating = {data.vote_average.toFixed(1)}/>
                    <Genres data = {data.genre_ids.slice(0,2)}/>
                </div>
                <div className="text-block">
                    <div className="title">
                        {data.title || data.name}
                    </div>
                    <div className="date">
                        {dayjs(data.release_Date).format('MMM D, YYYY')}
                    </div>
                </div>
            </div>
        </span>
    )
}
