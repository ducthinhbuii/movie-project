import React, { useState } from 'react'
import './styles.scss'
import { ContentWrapper } from '../../../components/contentWrapper/ContentWrapper'
import { Img } from '../../../components/lazyLoadImages/Img';
import { PlayIcon } from '../detailsBanner/Playbtn';
import VideoPopup from '../../../components/videoPopup/VideoPopup';

export const VideoSection = ({data, isLoading}) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);
    return (
        <div className="videoSection">
            <ContentWrapper>
                <div className="videoHeader">
                    Official Videos
                </div>
                {!isLoading && 
                <div className="videos">
                    {data?.results?.map((video) => {
                        return (
                            <div className="video"
                                key={video.id}
                                onClick={() => {
                                    setVideoId(video.key);
                                    setShow(true);
                                }}
                            >
                                <div className="videoThumbnail">
                                    <Img src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`} />
                                    <PlayIcon/>
                                </div>
                                <div className="videoTitle">{video.name}</div>
                            </div>
                        )
                    })}
                </div>
                }
            </ContentWrapper>
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    )
}
