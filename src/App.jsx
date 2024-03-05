import { useState } from 'react'
// import './App.css'
import {Route, Routes} from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import Header from './Components/Header'
import Login from './pages/Login'
import Register from './pages/Register'
import { UserContextProvider } from './UserContext'
import AccountPage from './pages/AccountPage'
import Layout from './pages/Layout'
import PlacesPage from './pages/PlacesPage'
import PlaceForm from './pages/PlaceForm'
import BookingsPage from './pages/BookingsPage'
import BookingPlace from './pages/BookingPlace'

function App() {

  return (
    <>
    <UserContextProvider>
    <Header />
    
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/login" element={<Login />} />
      <Route path='/register' element={<Register/>} />
      <Route path='/account' element={<AccountPage/>} />
      <Route path='/account/:subpage' element={<AccountPage/>} />
      {/* <Route path='/account/:subpage/:id' element={<AccountPage/>} /> */}
      <Route path='/account/bookings' element={<BookingsPage/>} />
      <Route path='/account/bookings/:id' element={<BookingPlace/>} />

      <Route path='/account/places/:id' element={<AccountPage/>} />
      {/* <Route path='/account/places/new' element={<PlaceForm/>} /> */}
      {/* <Route path='/account/places/:id' element={<PlaceForm/>} /> */}
      <Route path='/place/:id' element={<PlacesPage/>} />
    </Routes>    
    </UserContextProvider>
    </>
  )
}

export default App
