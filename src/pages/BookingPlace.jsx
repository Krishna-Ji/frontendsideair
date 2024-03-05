import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import PlacesGallery from '../Components/PlacesGallery';

const BookingPlace = () => {
  const {id} = useParams();
  const [booking,setBooking] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get('http://localhost:3000/bookings/' + id + '/').then(response => {
        const foundBooking = response.data;
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return '';
  }
  return (
    // <div>
    //   <h1 className="text-3xl">{booking.place.title}</h1>
    // </div>
    <div className=" rounded-lg max-w-[896px] ml-auto mr-auto mt-4 bg-gray-100 -mx-8 px-8 py-4">
    <h1 className="text-3xl">{booking.place.title}</h1>
    <div className="my-2 block">{booking.place.address}</div>
    <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
      <div>
        <h2 className="text-2xl mb-4">Your booking information:</h2>
        {/* <BookingDates booking={booking} /> */}
        <div>{format(new Date(booking.checkIn), 'yyyy-MM-dd')} - {format(new Date(booking.checkOut), 'yyyy-MM-dd')}</div>
        <div>{booking.numberOfGuests} guests</div>
        <div>${booking.price}</div>

      </div>
      <div className="bg-primary p-6 text-white rounded-2xl">
        <div>Total price</div>
        <div className="text-3xl">${booking.price}</div>
      </div>
    </div>
    <div className='max-w-[896px] ml-auto mr-auto mt-4 bg-gray-100 -mx-8 px-8 py-4'><PlacesGallery place={booking.place} /></div>
  </div>
  )
}

export default BookingPlace