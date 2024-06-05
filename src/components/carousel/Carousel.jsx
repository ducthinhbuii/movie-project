import React, { useRef } from 'react'
import './styles.scss'
import { useSelector } from 'react-redux';
import { getApiConfigSelector } from '../../redux/selector';
import { useNavigate } from 'react-router-dom';
import { ContentWrapper } from '../contentWrapper/ContentWrapper';
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import {Img} from '../lazyLoadImages/Img'

export const Carousel = ({data, isLoading}) => {
    const carouselContainer = useRef();
    const url = useSelector(getApiConfigSelector)
    const navigate = useNavigate()

    return (
        <div className='carousel'>
            <ContentWrapper>
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRighttNav arrow"
                    onClick={() => navigation("right")}
                />
                {!isLoading ? (
                    <div className="carousel-items">
                        {data?.map((item) => {
                            const poster_url = item.poster_path ? url.poster + item.poster_path :
                            'https://raw.githubusercontent.com/ShariqAnsari88/movix/main/src/assets/no-poster.png'
                            return (
                                <div className="carousel-item"
                                    key={item.id}>
                                        <div className="poster-block">
                                            <Img src={poster_url}/>
                                        </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <span>Loading...</span>
                )}
            </ContentWrapper>
        </div>
    )
}
