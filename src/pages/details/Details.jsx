import React from 'react'
import { useParams } from 'react-router-dom'
import './styles.scss'
import useFetch from '../../hooks/useFetch'
import { DetailsBanner } from './detailsBanner/DetailsBanner'
import { Cast } from './cast/Cast'
import { VideoSection } from './videoSection/VideoSection'
import { Similar } from './carousel/similar/Similar'
import { Recommendation } from './carousel/recommendation/Recommendation'

export const Details = () => {
  const {mediaType, id} = useParams()
  const {data, isLoading} = useFetch(`/${mediaType}/${id}/videos`)
  const {data:credits, isLoading:creditsLoading} = useFetch(`/${mediaType}/${id}/credits`)

  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data = {credits?.cast} isLoading = {creditsLoading}/>
      <VideoSection data = {data} isLoading = {isLoading}/>
      <Similar mediaTye={mediaType} id={id}/>
      <Recommendation mediaTye={mediaType} id={id}/>
    </div>
  )
}
