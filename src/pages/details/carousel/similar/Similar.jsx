import React from 'react'
import './styles.scss'
import useFetch from '../../../../hooks/useFetch'
import {Carousel} from '../../../../components/carousel/Carousel'

export const Similar = ({mediaTye, id}) => {
    const {data, isLoading, error} = useFetch(`/${mediaTye}/${id}/similar`);
    const title = mediaTye === 'tv' ? "Similar TV Shows" : "Similar Movies"
    return (
        <div className='carouselSection'>
            <Carousel title = {title} data = {data?.results} isLoading={isLoading} endpoint={mediaTye}/>
        </div>
    )
}
