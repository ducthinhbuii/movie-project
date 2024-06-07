import React from 'react'
import './styles.scss'
import useFetch from '../../../../hooks/useFetch'
import {Carousel} from '../../../../components/carousel/Carousel'

export const Recommendation = ({mediaTye, id}) => {
    const {data, isLoading, error} = useFetch(`/${mediaTye}/${id}/recommendations`);
    const title = "Recommendation"
    return (
        <div className='carouselSection'>
            <Carousel title = {title} data = {data?.results} isLoading={isLoading} endpoint={mediaTye}/>
        </div>
    )
}
