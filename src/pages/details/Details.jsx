import React from 'react'
import { useParams } from 'react-router-dom'
import './styles.scss'
import useFetch from '../../hooks/useFetch'
import { DetailsBanner } from './detailsBanner/DetailsBanner'

export const Details = () => {
  // const {mediaType, id} = useParams()
  // const {data, isLoading} = useFetch(`/${mediaType}/${id}`)

  return (
    <div>
      <DetailsBanner />
    </div>
  )
}
