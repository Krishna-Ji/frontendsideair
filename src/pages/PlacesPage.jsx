import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';
import PlacesGallery from '../Components/PlacesGallery';

const PlacesPage = () => {
    const [places, setPlaces] = useState([]);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [price, setPrice] = useState(0);
    const [redirect, setRedirect] = useState(false);

    let numberOfDays = 0;
    if (checkIn && checkOut) {
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        numberOfDays = Math.ceil((checkOutDate - checkInDate) / (24 * 3600 * 1000));
    }

    const {id} = useParams();
    useEffect(() => {
        
        if(!id) return;

       axios.get('https://back-airhoster-1.onrender.com/places/' + id).then((res) => {
       console.log(res.data); 
       setPlaces(res.data);   
       })
    }, [id]);

    function handleBooking() {
        if(!checkIn || !checkOut || !numberOfGuests || !name || !phone || !email) {
            return;
        }
        const bookingData = {
            place: places._id,
            checkIn,
            checkOut,
            numberOfGuests,
            name,
            phone,
            email,
            price: price,
        }

        axios.post('https://back-airhoster-1.onrender.com/bookings', bookingData).then((res) => {
            alert('Booking successful!');
            const bookingId = res.data._id;
            setRedirect(`/account/bookings`);
        }).catch((err) => {
            alert('Booking failed!');
        })
       
 
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    if(!places) return 'Loading...';

   

  return (
    <div className=' max-w-[896px] ml-auto mr-auto mt-4 bg-gray-100 -mx-8 px-8 py-4'>
     <h1 className=' text-3xl' >{places.title}</h1>
     <a className=' flex  my-2 gap-1 font-semibold underline' href="">
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
       <path stroke-linecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
     </svg>

      {places.address}</a>
     <PlacesGallery place={places} />
     <div>
      <h2 className=' text-2xl mt-8 mb-4'>About this place</h2>
      {places.description}
     </div>
     <div className=' grid grid-cols-[2fr_1fr]'>
      <div>
        Check-in: {places.checkIn}<br/>
        Check-out: {places.checkOut} <br/>
        Max number of guests: {places.maxGuests}
        <div>
        <h2 className=' text-2xl mt-8 mb-4'>Extra info</h2>
        <p>{places.extraInfo}</p>
      </div>
      </div>
      
      <div>
        <div className='flex flex-col gap-2 bg-white shadow-md p-4 rounded-2xl'>
          <div  className=' text-center text-2xl'>
          Price: ${places.Price} per night
          </div>
          <hr />
          <div className=' my-4 flex justify-between items-center px-2 '>
          <div className=' flex flex-col gap-2'>
            <label>Check in:</label>
            <input type="date" 
                    value={checkIn}
                    onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div className=' flex flex-col gap-2'>
            <label>Check out:</label>
            <input type="date" 
                    value={checkOut}
                    onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
          <hr />
          
          </div>
          <hr />
          <div className=' flex justify-between items-center px-2 '>
          <div className=' py-3 px-4 flex flex-col gap-2'>
            <label>Max number of guests:</label>
            <input onChange={(ev) => setNumberOfGuests(ev.target.value)} className=' py-3 px-4 w-full outline-none border' type="number" value={numberOfGuests} />
          </div>
          <hr />
          </div>
          {numberOfDays > 0 && (
            <>
            <div className=' flex justify-between items-center px-2 '>
            <div className=' py-3 px-4 flex flex-col gap-2'>
              <label>Your Full Name:</label>
              <input onChange={(ev) => setName(ev.target.value)} className=' py-3 px-4 w-full outline-none border' type="text" value={name} />
            </div>
            <hr />
            </div>
            <div className=' flex justify-between items-center px-2 '>
            <div className=' py-3 px-4 flex flex-col gap-2'>
              <label>Your Phone number:</label>
              <input onChange={(ev) => setPhone(ev.target.value)} className=' py-3 px-4 w-full outline-none border' type="text" value={phone} />
            </div>
            <hr />
            </div>
            <div className=' flex justify-between items-center px-2 '>
            <div className=' py-3 px-4 flex flex-col gap-2'>
              <label>Your Email address:</label>
              <input onClick={() => setPrice(numberOfDays * places.Price)} onChange={(ev) => setEmail(ev.target.value)} className=' py-3 px-4 w-full outline-none border' type="email" value={email} />
            </div>
            <hr />
            </div>
            </>
          )}
          <button onClick={handleBooking} className=' text-center bg-red-500 text-white rounded-full p-2'>Book now
          
            {numberOfDays > 0 && (
              <>
              <span>{price}</span>
              {/* {setPrice(numberOfDays * places.Price)} */}
              </>
            )}
        
          </button>
        </div>
      </div>
     
     </div>
    </div>
  )
}

export default PlacesPage