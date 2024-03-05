import React from 'react'

const PlaceImg = ({place, index=0,className=null}) => {

    if(!place?.photos?.length) {
        return null
    }
    if (!className) {
        className = 'object-cover'
    }
  return (
    <img className={className} src={'https://back-airhoster-1.onrender.com/uploads/' + place?.photos[index]} alt='place img' />
  )
}

export default PlaceImg