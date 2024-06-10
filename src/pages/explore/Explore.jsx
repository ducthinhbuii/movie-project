import React, { useEffect, useState } from 'react'
import './styles.scss'
import {useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import Spinner from '../../components/spinner/Sprinner'
import {ContentWrapper} from '../../components/contentWrapper/ContentWrapper'
import { MovieCard } from '../../components/movieCard/MovieCard'
import { Selector } from '../../components/selector/Selector'
import { fetchDataFromAPI } from "../../ultis/api";

export const Explore = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1)
  const { mediaType } = useParams();
  // const {data, isLoading} = useFetch(`/discover/${mediaType}`);
  const [numOfPages, setNumOfPages] = useState(0);
  const [arrCurNumOfPages, setArrCurNumOfPages] = useState([])
  const { data: genresData } = useFetch(`/genre/${mediaType}/list`);
  const [genre, setGenre] = useState([]);
  const [sortby, setSortby] = useState(null);
  let filters = {};

  async function fetchData(){
    setIsLoading(true);
    setData(null);
    try {
        const data = await fetchDataFromAPI(`/discover/${mediaType}?page=${pageNum}`, filters);
        settingPagination(data)
        setIsLoading(false)
        setData(data);
    } catch (error) {
        setIsLoading(false)
    }
  }

  const onChange = (selectedItems, action) => {
    console.log(selectedItems)
    setGenre(selectedItems);
    if (action === "genres") {
      const genreId = JSON.stringify(selectedItems).slice(1, -1);
      filters.with_genres = genreId;
      console.log(filters)
    }
    fetchData()
  }

  const settingPagination = (data) => {
    if (data) {
      setNumOfPages(data.total_pages);

      const dotsInitial = '...'
      const dotsLeft = '... '
      const dotsRight = ' ...'

      let tempArr = [];
      for (let i = 1; i <= data.total_pages; i++) {
        tempArr.push(i);
      }

      if(data.total_pages >= 5) {
        if(pageNum >= 1 && pageNum <= 3){
          tempArr = [1,2,3,4,dotsLeft,data.total_pages]
        }
        else if (pageNum === 4) {
          tempArr = [1,2,3,4,5, dotsInitial, data.total_pages]
        }
        else if (pageNum > 4 && pageNum < data.total_pages - 2) {                              
          tempArr = [1, dotsLeft, pageNum - 1, pageNum, pageNum + 1, dotsRight, data.total_pages]
        }
        else if (pageNum > data.total_pages - 3) {               
          const sliced = Array.from({ length: 3 }, (_, index) => data.total_pages - 2 + index);  
          tempArr = [1, dotsLeft, ...sliced]                    
        }
      }
      setArrCurNumOfPages(tempArr);
    }
  }

  useEffect(() => {
    fetchData();
  }, [pageNum])

  useEffect(() => {
    filters = {};
    fetchData();
    setSortby(null);
    setGenre([]);
    
  }, [mediaType])

  const handlePrePage = (page) => {
    if(pageNum !== 1){
      setPageNum(pageNum - 1);
    }
  }

  const handleNextPage = (page) => {
    if(pageNum !== 10){
      setPageNum(pageNum + 1);
    }
  }

  return (
    <div className="searchResultPages">
      {isLoading && <Spinner initial={true}/>}
      {!isLoading && data && 
      <ContentWrapper>
        {data.results.length > 0 ? (
          <>
            <div className="pageHeader">  
              <div className="pageTitle">
                {`Explore ${mediaType === 'tv' ? 'TV Shows' : 'Movies' }`}
              </div>
              <div className="pageFilter">
                <Selector data = {genresData} onChange = {onChange} value = {genre}/>
              </div>
            </div>
            
            <div className='movieList'>
              {data?.results.map((item,index) => {
                if(item.media_type === 'person') return;
                return (
                  <MovieCard key = {index} data={item} fromSearch={true} endpoint = {mediaType}/>
                )
              })}
            </div>
          </>
        ) : (
          <div className="pageNotFound">
            Sorry, Result Not Found
          </div>
        )}
        <div class="pagination">
          <a href="#"
          onClick={() => {handlePrePage(pageNum)}}
          >&laquo;</a>
          {
            arrCurNumOfPages.map((page) => {
              return (
                <a href="#" className={pageNum === page ? 'actived' : ''}
                onClick={
                  () => {
                    if(page === '...'){
                      setPageNum(arrCurNumOfPages[arrCurNumOfPages.length-3] + 1)
                      return
                    }
                    if(page === ' ...'){
                      setPageNum(arrCurNumOfPages[3] + 2)
                      return
                    }
                    if(page === '... '){
                      setPageNum(arrCurNumOfPages[3] - 2)
                      return
                    }
                    setPageNum(page);
                  }}
                >{page}</a>
              )
            })
          }
          <a href="#" className='disabled'
          onClick={() => {handleNextPage(pageNum)}}
          >&raquo;</a>
        </div>
      </ContentWrapper>
      }
    </div>
  )
}
