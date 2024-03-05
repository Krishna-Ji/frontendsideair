import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Login = () => {
   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext) 
    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        try {
           const {data} = await axios.post('http://localhost:3000/login', {email, password}, {withCredentials: true});
            setUser(data);
            alert('Login successful');
            setRedirect(true);
        } catch (e) {
            alert('Login failed');
            console.log(e);
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

  return (
    <div className=' text-center w-full h-[80vh] pt-[100px] '>
        <div className=' w-[580px] h-[600px] bg-white m-auto pt-[40px] pb-[40px] pl-[60px] pr-[60px]'>
            <h1 className=' text-center text-4xl'>Login</h1>
        
        <form onSubmit={handleLoginSubmit} className=' max-w-md mx-auto'>
        <div className=' gap-3 flex flex-col pt-[70px]'>
            <div>
                <input
                value={email}
                onChange={ev => setEmail(ev.target.value)}
                placeholder=' Your@email' className=' w-[400px] pl-1 py-2  rounded-full border border-gray-300 outline-none' type="text" />
            </div>
            <div>
                <input
                value={password}
                onChange={ev => setPassword(ev.target.value)}
                placeholder=' Password' className=' w-[400px] pl-1 py-2 rounded-full border border-gray-300 outline-none' type="text" />
            </div>
        <div className=' mt-5'>
        <button  className=' text-xl  w-[400px] py-2 bg-red-600 text-white rounded-full'>Login</button>
        </div>
        </div>
        </form>
        </div>
    </div>
  )
}

export default Login