import React, { useState } from 'react'
import './styles.scss'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getApiConfigSelector } from '../../../redux/selector'
import { Img } from '../../../components/lazyLoadImages/Img'
import useFetch from '../../../hooks/useFetch'
import { ContentWrapper } from '../../../components/contentWrapper/ContentWrapper'
import {Genres} from '../../../components/genres/Genres'
import dayjs from "dayjs";
import CircleRating from '../../../components/circleRating/CircleRating'
import { PlayIcon } from './Playbtn'
import  VideoPopup from '../../../components/videoPopup/VideoPopup'

export const DetailsBanner = ({video, crew}) => {
    const {mediaType, id} = useParams()
    const {data, isLoading} = useFetch(`/${mediaType}/${id}`)
    const url = useSelector(getApiConfigSelector)
    const _genres = data?.genres?.map((g) => g.id);
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null)

    const director = crew?.filter((f) => f.job === "Director");
    const writer = crew?.filter(
        (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
    );

    const handleVideoPlay = () => {
        console.log("video")
            setShow(true)
            setVideoId(video.key)
    }

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    return (
        <div className='detailsBanner'>
            { data &&
            <ContentWrapper>
                {!isLoading &&
                    <div className="backdrop-img">
                        <Img src={url.backdrop + data?.backdrop_path} />
                    </div>    
                }
                <div className="opacity-layer"></div>
                <div className="content">
                    <div className="left">
                        {data?.poster_path ? 
                        (
                            <Img
                                className="posterImg"
                                src={
                                    url.backdrop +
                                    data.poster_path
                                }
                            />
                        ) : (
                            <Img
                                className="posterImg"
                                src='https://raw.githubusercontent.com/ShariqAnsari88/movix/main/src/assets/no-poster.png'
                            />
                        )}
                    </div>
                    <div className="right">
                        <div className="title">
                            {`${
                                data.name || data.title
                            } (${dayjs(
                                data?.release_date
                            ).format("YYYY")})`}
                        </div>
                        <div className="subtitle">
                            {data.tagline}
                        </div>
                        <Genres data = {_genres}/>

                        <div className="row">
                            <CircleRating rating={data.vote_average.toFixed(1)}/>
                            <div className="playbtn" 
                             onClick = {handleVideoPlay}>
                                <PlayIcon />
                                <span>
                                    <div className="text">Watch Trailer</div>
                                </span>
                            </div>
                        </div>
                        <div className="overview">
                            <div className="heading">
                                Overview
                            </div>
                            <div className="description">
                                {data.overview}
                            </div>
                        </div>
                        <div className="info">
                            {data.status && (
                                <div className="infoItem">
                                    <div className="text bold">
                                        Status: {''}
                                    </div>
                                    <div className="text">
                                        {data.status}
                                    </div>
                                </div>
                            )}
                            {data.release_date && (
                                <div className="infoItem">
                                    <div className="text bold">
                                        Release: {''}
                                    </div>
                                    <div className="text">
                                        {dayjs(data.release_date).format("MMM D, YYYY")}
                                    </div>
                                </div>
                            )}
                            {data.runtime && (
                                <div className="infoItem">
                                    <span className="text bold">
                                        Runtime:{" "}
                                    </span>
                                    <span className="text">
                                        {toHoursAndMinutes(
                                            data.runtime
                                        )}
                                    </span>
                                </div>
                            )}
                        </div>
                        {   director?.length > 0 &&
                            <div className="info">
                             <div className="infoItem">
                                    <div className="text bold">
                                        Director: {''}
                                    </div>
                                    <div className="text">
                                        {director.map((d, i) => (
                                            <span key = {i}>
                                                {d.name}
                                                {director.length - 1 !== i && ', '}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                        </div>}
                        { writer?.length > 0 &&
                            <div className="info">
                                <div className="infoItem">
                                    <div className="text bold">
                                        Writer: {''}
                                    </div>
                                    <div className="text">
                                        {writer.map((d, i) => (
                                            <span key = {i}>
                                                {d.name}
                                                {writer.length - 1 !== i && ', '}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                        </div>}
                        {data?.created_by?.length > 0 &&
                            <div className="info">
                                <div className="infoItem">
                                    <div className="text bold">
                                        Created By:  {''}
                                    </div>
                                    <div className="text">
                                        {data.created_by.map((d, i) => (
                                            <span key = {i}>
                                                {d.name}
                                                {data?.created_by.length - 1 !== i && ', '}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                        </div>}
                    </div>

                </div>
                <VideoPopup show={show} setShow={setShow} videoId={videoId} setVideoId={setVideoId}/>
            </ContentWrapper>
            }
        </div>
    )
}
