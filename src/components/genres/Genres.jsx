import React from 'react'
import './styles.scss'
import { useSelector } from 'react-redux';
import {getGenresSelector } from '../../redux/selector';


export const Genres = ({data}) => {
    const genres = useSelector(getGenresSelector)
    return (
        <div className="genres">
            {data.map((item) => {
                if(!genres[item]?.name) return;
                return <div className="genre" key={item}>{genres[item]?.name}</div>
            })}
        </div>
    )
}
