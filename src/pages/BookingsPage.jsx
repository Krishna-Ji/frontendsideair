import React, { useEffect, useState } from 'react'
import AccountPage from './AccountPage'
import axios from 'axios';
import PlaceImg from '../PlaceImg';
import {format, parseISO} from 'date-fns'
import { Link } from 'react-router-dom';

const BookingsPage = () => {
  
  const [bookings, setBookings] = useState([]);
  const [Delete, setDelete] = useState('');
  useEffect(() => {
    axios.get('https://back-airhoster-1.onrender.com/bookings').then((res) => {
      setBookings(res.data);
      console.log(res.data);
    });
  }, [])

  function handleDelete(id) {
    axios.delete('https://back-airhoster-1.onrender.com/bookings/' + id).then(() => {
      setBookings(bookings.filter((booking) => booking._id !== id))
      
    })
  }


  if(!bookings) return 'Loading...';

  return (
    <div onMouseEnter={() => setDelete('Mouse Entered')} onMouseLeave={() => setDelete(false)}>
      <AccountPage/>
      <div>
        {bookings?.length > 0 && bookings?.map((booking) => (
          <div className=' relative'>
          <Link to={'/account/bookings/' + booking._id} className=' max-w-[896px] ml-auto mr-auto  mb-4 p-4 shadow-[] rounded-2xl overflow-hidden flex gap-4 bg-gray-200'>
            <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
               <PlaceImg className={'aspect-square object-cover'} place={booking.place} />
            </div>
            <div className=' '>
              <h2 className=' text-xl'>{booking.place?.title}</h2>
              {format(new Date(booking.checkIn), 'yyyy-MM-dd')} - {format(new Date(booking.checkOut), 'yyyy-MM-dd')}
              <div>
              {booking.place?.description}
            </div>
            </div>
            
          </Link>
          <button onClick={() => handleDelete(booking._id)} className={Delete === 'Mouse Entered' ? ' absolute cursor-pointer mb-2 mr-2 bg-black p-2 rounded-xl text-white top-0 right-0' : 'hidden rounded-md mt-[30px] justify-center items-center h-[40px] shrink-0 bg-red-600 p-5 mr-5 w-[80px] ' } >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
        </button>
        </div>
        
        ))} 
        
      </div>
    </div>

  )
}

export default BookingsPage