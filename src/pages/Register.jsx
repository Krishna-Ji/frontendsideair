import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function registerUser(ev) {
        ev.preventDefault()
     try {
        axios.post('https://back-airhoster-1.onrender.com/register', {
         name,
         email,
         password
     });
      alert("Registered successfully")

     } catch (e) {
         alert("Registration failed")
     }
    }

  return (
    <div className=' text-center w-full h-[80vh] pt-[100px] '>
        <div className=' w-[580px] h-[600px] bg-white m-auto pt-[40px] pb-[40px] pl-[60px] pr-[60px]'>
            <h1 className=' text-center text-4xl'>Register</h1>
        <form onSubmit={registerUser} className=' max-w-md mx-auto' action="">
        <div className=' gap-3 flex flex-col pt-[70px]'>
        <div>
                <input placeholder=' Your Name' className=' w-[400px] pl-1 py-2  rounded-full border border-gray-300 outline-none' type="text" 
                
                value={name}
                onChange={(e) => setName(e.target.value)}

                />
            </div>
            <div>
                <input placeholder=' Your@email' className=' w-[400px] pl-1 py-2  rounded-full border border-gray-300 outline-none' type="text"
                
                value={email}
                onChange={(e) => setEmail(e.target.value)}

                />
            </div>
            <div>
                <input placeholder=' Password' className=' w-[400px] pl-1 py-2 rounded-full border border-gray-300 outline-none' type="text"
                
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                
                />
            </div>
        <div className=' mt-5'>
        <button className=' text-xl  w-[400px] py-2 bg-red-600 text-white rounded-full'>Register</button>
        </div>
        <div className=' mt-5'>
            <p>Already have an account? <Link className=' text-red-600' to={'/login'}>Login</Link> </p>
        </div>
        </div>
        </form>
        </div>
    </div>
  )
}

export default Register