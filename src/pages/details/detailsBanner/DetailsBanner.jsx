import React from 'react'
import './styles.scss'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getApiConfigSelector } from '../../../redux/selector'
import { Img } from '../../../components/lazyLoadImages/Img'
import useFetch from '../../../hooks/useFetch'
import { ContentWrapper } from '../../../components/contentWrapper/ContentWrapper'
import {Genres} from '../../../components/genres/Genres'
import dayjs from "dayjs";

export const DetailsBanner = () => {
    const {mediaType, id} = useParams()
    const {data, isLoading} = useFetch(`/${mediaType}/${id}`)
    const url = useSelector(getApiConfigSelector)
    const _genres = data?.genres?.map((g) => g.id);
    if(data) console.log(data)

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
                    </div>
                </div>
            </ContentWrapper>
            }
        </div>
    )
}
