
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Photosuploader from '../Components/Photosuploader';
import AccountPage from './AccountPage';



const PlaceForm = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [Price, setPrice] = useState(100);
    const [Places, setPlaces] = useState();
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
      if(id !== 'new') {
        
      
      axios.get('http://localhost:3000/places/' + id).then(({data}) => {
        const {title, address,Price, photos, description, perks, extraInfo, checkIn, checkOut, maxGuests} = data;
        setTitle(title);
        setAddress(address);
        setAddedPhotos(photos);
        setDescription(description);
        setPerks(perks);
        setExtraInfo(extraInfo);
        setCheckIn(checkIn);
        setCheckOut(checkOut);
        setMaxGuests(maxGuests);
        setPrice(Price);

      })}}, [id]);

      async function addNewPlace(ev) {
  ev.preventDefault();

  const placedata = {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    Price,
  };

  await axios.post('http://localhost:3000/places', placedata);
  setRedirect('/account/places/')
  
  
};  

      if (redirect) {
        return <Navigate to={redirect} />;
      }
        

      

            
          
        
  return (

    <>
        <div className=' mb-2 mt-4 max-w-[880px] mx-auto'>
          <form onSubmit={addNewPlace}>
            <h2 className='ml-1 text-xl mt-4'>Title</h2>
            <p className='ml-1 text-gray-500 text-sm'>Title for your place should be short and catchy</p>
            <input type="text" value={title} onChange={(ev) => setTitle(ev.target.value)} placeholder='title, for example "Empire State Building"' className='w-full outline-none border  py-1 px-4 rounded-2xl border-gray-200 mt-2' />
            <h2 className='ml-1 text-xl mt-4'>Address</h2>
            <input value={address} onChange={(ev) => setAddress(ev.target.value)} type="text" placeholder='address' className=' w-full outline-none border  py-1 px-4 rounded-2xl border-gray-200 mt-2' />
            <h2 className=' ml-1 text-xl mt-4'>Photos</h2>
            <p className='ml-1 text-gray-500 text-sm'>more = better</p>
            <Photosuploader addedPhotos={addedPhotos} setAddedPhotos={setAddedPhotos} photoLink={photoLink} setPhotoLink={setPhotoLink} />
            <h2 className=' ml-1 text-xl mt-4'>Description</h2>
            <p className='ml-1 text-gray-500 text-sm'>description of the place</p>
            <textarea value={description} onChange={(ev) => setDescription(ev.target.value)} type="text" placeholder='description' className='w-full mt-4 py-2 px-4 outline-none border rounded-2xl h-20 mb-2' />
            <h2 className=' ml-1 text-xl mt-4'>Perks</h2>
            <p className='ml-1 text-gray-500 text-sm'>select all that apply</p>
            <div className=' grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2'>
              
              <label  className=' border p-4'>
                <input checked={perks[0] === 'on'} onChange={(ev) => setPerks(prev => [...prev, ev.target.value])} type='checkbox' />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                </svg>

                <span>Wifi</span>
              </label >
              <label className=' border p-4'>
                <input checked={perks[1] === 'on'} onChange={(ev) => setPerks(prev => [...prev, ev.target.value])} type='checkbox' />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>

                <span>Free parking spot</span>
              </label >
              <label className=' border p-4'>
                <input checked={perks[2] === 'on'}  onChange={(ev) => setPerks(prev => [...prev, ev.target.value])} type='checkbox' />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
                </svg>

                <span>TV</span>
              </label >
              <label className=' border p-4'>
                <input checked={perks[3] === 'on'} onChange={(ev) => setPerks(prev => [...prev, ev.target.value])} type='checkbox' />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
                </svg>

                <span>Heating</span>
              </label >
              <label className=' border p-4'>
                <input checked={perks[4] === 'on'} onChange={(ev) => setPerks(prev => [...prev, ev.target.value])} type='checkbox' />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                </svg>

                <span>Air conditioning</span>
              </label>
              
    
            </div>
            <h2 className=' ml-1 text-xl mt-4'>Extrainfo</h2>
            <p className='ml-1 text-gray-500 text-sm'>house rules, etc</p>
            <textarea value={extraInfo} onChange={e => setExtraInfo(e.target.value)} className='w-full mt-4 py-2 px-4 outline-none border rounded-2xl h-20 mb-2' name="" id="" cols="30" rows="10"></textarea>
            <h2 className=' ml-1 text-xl mt-4'>Check in&out times, max guests</h2>
            <p className='ml-1 text-gray-500 text-sm'>add check in and out times, remember to have some time for cleaning and check in time</p>
            <div className='grid gap-1 sm:grid-cols-4'>
              <div>
                <h3 className='mt-2 -mb-1'>Check in time</h3>
              <input  value={checkIn} onChange={e => setCheckIn(e.target.value)} type='number' className='w-full outline-none border  py-1 px-4 rounded-2xl border-gray-200 mt-2' placeholder='14:00'   />
              </div>
              <div>
              <h3 className='mt-2 -mb-1'>Check out time</h3>
              <input value={checkOut} onChange={e => setCheckOut(e.target.value)} type="number"  className='w-full outline-none border  py-1 px-4 rounded-2xl border-gray-200 mt-2' placeholder='14:00'   />
              </div>
              <div>
              <h3 className='mt-2 -mb-1'>Max number of guests</h3>
              <input value={maxGuests} onChange={e => setMaxGuests(e.target.value)} type="text"  className='w-full outline-none border  py-1 px-4 rounded-2xl border-gray-200 mt-2' placeholder='14:00'   />
              </div>
              <div>
              <h3 className='mt-2 -mb-1'>Price Per Night</h3>
              <input value={Price} onChange={e => setPrice(e.target.value)} type="text"  className='w-full outline-none border  py-1 px-4 rounded-2xl border-gray-200 mt-2' placeholder='14:00'   />
              </div>
            </div>
            <div>
              <button className='w-full bg-red-500 text-white py-2 px-4 rounded-2xl mt-4'>Save</button>
            </div>
          </form>
        </div>
      </>
  )
}

export default PlaceForm