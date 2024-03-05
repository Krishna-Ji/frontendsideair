import React from 'react'
import axios from 'axios';

const Photosuploader = ({ addedPhotos, setAddedPhotos, photoLink, setPhotoLink }) => {

  async function addPhotoByLink(ev) {
    ev.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/uploadby', { link: photoLink });
      if (response.status === 200) {
        // Image upload successful
        const newPhotoName = response.data;
        setAddedPhotos(prev => [...prev, newPhotoName]);
      } else {
        // Handle non-200 status codes (e.g., 400, 500)
        console.error('Image upload failed:', response.status, response.statusText);
        // Inform the user about the error in a user-friendly way
      }
    } catch (error) {
      // Handle errors during the request or response
      console.error('Error uploading image:', error);
      // Inform the user about the error in a user-friendly way
    }

    setPhotoLink('');
  }

  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i]);
    }
    data.append('photos', files);
    axios.post('http://localhost:3000/uploads', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(res => {
      const { data: filenames } = res;
      setAddedPhotos(prev => {
        return [...prev, ...filenames];
      });
    })

    function selectAsMainPhoto(ev,link) {
      
      ev.preventDefault(),
      onchange([link, ...addedPhotos.filter((item) => item !== link)])
    }

  }
  return (
    <>
      <div className='flex mt-2 gap-2'>
        <input value={photoLink} onChange={(ev) => setPhotoLink(ev.target.value)} className='w-full outline-none border py-1 px-4 rounded-2xl border-gray-200' type="text" placeholder='Add using a link' />
        <button onClick={addPhotoByLink} className='bg-gray-200 px-4 rounded-2xl'>Add&nbsp;Photos</button>
      </div>
      <div className='mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
        {addedPhotos && addedPhotos.map((link) => {

          return (
            <div className='h-32 flex relative' key={link}>
              <img key={link} src={'http://localhost:3000/uploads/' + link} className='w-full rounded-2xl' />
              <button onClick={() => setAddedPhotos(prev => prev.filter(item =>  item !== link))} className=' cursor-pointer mb-2 mr-2 bg-black p-2 rounded-xl text-white absolute bottom-0 right-0'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>

              </button>
              <button onClick={ (ev) => {ev.preventDefault(); setAddedPhotos([link, ...addedPhotos.filter((item) => item !== link)]) }} className=' cursor-pointer mb-2 mr-2 bg-black p-2 rounded-xl text-white absolute bottom-0 left-0'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
               </svg>


              </button>
            </div>
          );

        })}
        <label className=' cursor-pointer border bg-transparent rounded-2xl p-8 text-2xl text-gray-400' >
          <input type='file' className='hidden' onChange={uploadPhoto} />
          Upload from your device
        </label>
      </div>
    </>
  )
}

export default Photosuploader