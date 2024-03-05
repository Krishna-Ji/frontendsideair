import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const IndexPage = () => {
const [Places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get('https://back-airhoster-1.onrender.com/places').then((res) => {
      console.log(res.data);
      setPlaces(res.data);

    })
  }, [])
  return (
    <div className='
    max-w-[896px] ml-auto mr-auto gap-y-6 mt-8 gap-x-8 justify-between  m-4
     grid-cols-2 grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
     {Places.length > 0 && Places.map((place) => (
        <Link to={'place/' + place._id} key={place._id}>
          <div className='rounded-2xl mb-2 mt-4 bg-gray-500'>
            {place.photos?.[0] && (
              <img
                className=' rounded-2xl aspect-square object-cover'
                src={'https://back-airhoster-1.onrender.com/uploads/' + place.photos[0]}
                alt=''
              />
            )}
          </div>
          <h3 className= '  truncate font-bold'>{place.address}</h3>
          <h2 className=' text-gray-500 text-sm truncate'>{place.title}</h2>
          <div>
            ${place.Price} Per Night
          </div>
        </Link>
      ))}
    </div>
  )
}

export default IndexPage