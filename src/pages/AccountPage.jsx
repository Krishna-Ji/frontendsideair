import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PlacePage from './PlacePage';
import PlaceForm from './PlaceForm';
import Bookings from './BookingsPage';

const AccountPage = () => {
  const [redirect, setRedirect] = useState(null);
  const {ready,user, setUser} = useContext(UserContext);
  const [Subpage, setSubpage] = useState('');
  
  let {subpage} =  useParams();
  console.log(subpage);
  // if (subpage === undefined) {
  //    subpage = 'profile';
  // } 

  let {id} =  useParams();
  console.log(id);


   function logout() {
     axios.post('http://localhost:3000/logout');
     setUser(null);
     setRedirect('/');
  }

  if(!ready) return 'loading...';

  if(ready && !user && !redirect) {
    

    return <Navigate to={'/login'} />
  
  }
  
  if(redirect) {
    return <Navigate to={redirect} />
  }

  return (
    

    <div>
      <nav className=' mt-7 justify-center w-full mb-8 flex gap-4'>
        <Link onClick={() => setSubpage('profile')} className={Subpage === 'profile' ? 'py-2 px-6 bg-red-500 text-white rounded-full' : 'py-2 px-6'} to={'/account/profile'}>My Profile</Link>
        <Link onClick={() => setSubpage('bookings')} className={Subpage === 'bookings' ? 'py-2 px-6 bg-red-500 text-white rounded-full' : 'py-2 px-6'} to={'/account/bookings'}>My Bookings</Link>
        <Link onClick={() => setSubpage('places')} className={Subpage === 'places' ? 'py-2 px-6 bg-red-500 text-white rounded-full' : 'py-2 px-6'} to={'/account/places'}>My Accommodations</Link>
      </nav>
      {subpage === 'profile' && (
        <div className=' text-center max-w-lg mx-auto'>
          Logged in as {user.name} ({user.email}) <br/>
          <button onClick={logout} className=' bg-red-500 max-w-sm mt-10 text-white py-2 px-4 rounded-full'>Logout</button>
      

    </div>)}
    {subpage === 'places' && (
      <div>
        <PlacePage/>
      </div>
    )}
    {subpage === 'bookings' && (
      <div>
        <Bookings/>
      </div>
    )}

    {
      id === 'new' && (
        <div>
          <PlaceForm />
        </div>
      )
    }

    {
      ((id && subpage === 'places') ? 
      <div>
        <PlaceForm/>
      </div>
      :
      <div>
        
      </div>
      )
    }
    </div>
  )
}

export default AccountPage