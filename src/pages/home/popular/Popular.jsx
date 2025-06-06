import React ,{ useState }  from 'react'
import './styles.scss'
import { ContentWrapper } from '../../../components/contentWrapper/ContentWrapper'
import { SwitchTabs } from '../../../components/switchTabs/switchTabs'
import { Carousel } from '../../../components/carousel/Carousel'
import useFetch from '../../../hooks/useFetch'

export const Popular = () => {
    const [endpoint, setEndpoint] = useState("movie")
    const {data, isLoading} = useFetch(`/${endpoint}/popular`)
  
    const onTabChange = (value, index) => {
      setEndpoint(value === 'Movies' ? 'movie' : 'tv')
    }
  
    return (
      <div className='carouselSection'>
          <ContentWrapper>
              <div className="carouselTitle">What's Popular</div>
              <SwitchTabs data = {["Movies", "TV Shows"]} onTabChange = {onTabChange} />
          </ContentWrapper>
          <Carousel data = {data?.results} isLoading = {isLoading} endpoint={endpoint} />
      </div>
    )
}
