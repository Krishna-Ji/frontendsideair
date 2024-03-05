import React, { useState } from 'react'

const PlacesGallery = ({place}) => {
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  
  if(showAllPhotos) {
    return (
        <div className=' absolute inset-0 bg-gray-100 '>
          <div className=' p-8 grid gap-4'>
              <div>
                  <button onClick={() => setShowAllPhotos(false)} className=' fixed flex gap-1 py-2 px-4 bg-white rounded-full'>
                      Back
                  </button>
              </div>
              {place.photos?.map((x, i) => (
                  <img key={i} src={'https://back-airhoster-1.onrender.com/uploads/' + x} alt="" />
              ))}
          </div>
        </div>
    )
  }
  return (
    <div className=' relative'>
        <div className=' grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden'>
          <div>
            {place.photos?.[0] && (
              <img src={'https://back-airhoster-1.onrender.com/uploads/' + place.photos[0]} alt="" className=' cursor-pointer object-cover aspect-square rounded-2xl' onClick={() => setShowAllPhotos(true)} />
            )}
          </div>
          <div className=' grid'>
            {place.photos?.[1] && (
              <img src={'https://back-airhoster-1.onrender.com/uploads/' + place.photos[1]} alt="" className=' cursor-pointer object-cover aspect-square rounded-2xl' onClick={() => setShowAllPhotos(true)} />
            )}
            <div className=' overflow-hidden'>
              {place.photos?.[2] && (
                <img src={'https://back-airhoster-1.onrender.com/uploads/' + place.photos[2]} alt="" className=' cursor-pointer object-cover aspect-square rounded-2xl' onClick={() => setShowAllPhotos(true)} />
              )}
            </div>
          </div>
        </div>
        
    </div>
  )
}

export default PlacesGallery