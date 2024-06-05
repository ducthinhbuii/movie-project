import React, { useState } from 'react'
import './styles.scss'
import { ContentWrapper } from '../../../components/contentWrapper/ContentWrapper'
import { SwitchTabs } from '../../../components/switchTabs/switchTabs'
import { Carousel } from '../../../components/carousel/Carousel'
import useFetch from '../../../hooks/useFetch'

export const Trending = () => {
  const [endpoint, setEndpoint] = useState("day")
  const {data, isLoading} = useFetch(`/trending/all/${endpoint}`)
  console.log({data, isLoading})

  const onTabChange = (value, index) => {
    setEndpoint(value === 'Day' ? 'day' : 'week')
  }

  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <div className="carouselTitle">Trending</div>
            <SwitchTabs data = {["Day", "Week"]} onTabChange = {onTabChange} />
        </ContentWrapper>
        <Carousel data = {data?.results} isLoading = {isLoading} />
    </div>
  )
}
