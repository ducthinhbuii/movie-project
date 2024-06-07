import React, { useRef } from 'react'
import { useSelector } from 'react-redux';
import './styles.scss'
import { getApiConfigSelector } from '../../redux/selector';
import { useNavigate } from 'react-router-dom';
import { ContentWrapper } from '../contentWrapper/ContentWrapper';
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import {Img} from '../lazyLoadImages/Img'
import dayjs from 'dayjs';
import CircleRating from '../circleRating/CircleRating';
import { Genres } from '../genres/Genres';

export const Carousel = ({title, data, isLoading, endpoint}) => {
    const carouselContainer = useRef();
    const url = useSelector(getApiConfigSelector)
    const navigate = useNavigate()

    const navigation = (dir) => {
        const container = carouselContainer.current;

        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20); 

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };

    return (
        <div className='carousel'>
            <ContentWrapper>
                {title && 
                    <div className="carouselTitle">{title}</div>
                }
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRighttNav arrow"
                    onClick={() => navigation("right")}
                />
                {!isLoading ? (
                    <div className="carousel-items" ref={carouselContainer}>
                        {data?.map((item) => {
                            const poster_url = item.poster_path ? url.poster + item.poster_path :
                            'https://raw.githubusercontent.com/ShariqAnsari88/movix/main/src/assets/no-poster.png'
                            return (
                                <div className="carousel-item"
                                    key={item.id}
                                    onClick={() => navigate(`/${item.media_type || endpoint}/${item.id}`)}
                               >
                                        <div className="poster-block">
                                            <Img src={poster_url}/>
                                            <CircleRating rating = {item.vote_average.toFixed(1)}/>
                                            <Genres data = {item.genre_ids.slice(0,2)}/>
                                        </div>
                                        <div className="text-block">
                                            <div className="title">
                                                {item.title || item.name}
                                            </div>
                                            <div className="date">
                                                {dayjs(item.release_Date).format('MMM D, YYYY')}
                                            </div>
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
