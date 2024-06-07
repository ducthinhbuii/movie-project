import React from 'react'
import { ContentWrapper } from '../../../components/contentWrapper/ContentWrapper'
import { useSelector } from 'react-redux'
import { getApiConfigSelector } from '../../../redux/selector'
import { Img } from '../../../components/lazyLoadImages/Img'

import './styles.scss'  

export const Cast = ({data,isLoading}) => {
    const url = useSelector(getApiConfigSelector)

    return (
        <div className='castSection'>
            <ContentWrapper>
                <div className="sectionHeading">Top Cast</div>
                {!isLoading && 
                <div className="listCasts">
                    {
                        data?.map((cast) => {
                            const imgUrl = cast.profile_path
                            ? url.profile + cast.profile_path
                            : 'https://raw.githubusercontent.com/ShariqAnsari88/movix/main/src/assets/avatar.png';
                            return (
                                <div className="listCast"
                                    >
                                    <div className="profileImg">
                                        <Img src={imgUrl}/>
                                    </div>
                                    <div className="profileName">
                                        {cast.name}
                                    </div>
                                    <div className="profileCharacter">
                                        {cast.character}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                }
            </ContentWrapper>
        </div>
  )
}
