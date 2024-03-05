import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export const UserContext = createContext({});

export function UserContextProvider({ children }) {

    const [user, setUser] = useState(null)
    const [ready, setReady] = useState(false);

    useEffect(  () => {
            if(!user) {
                 fetch('http://localhost:3000/profile', {
                        credentials: 'include',
                        
                    }).then((res) => res.json()).then((data) => 
                    { setUser(data)
                      setReady(true);
                    }).catch((e) => console.log(e))
                    
        }
        console.log(user)

    }, []);
    
    return (
        <UserContext.Provider value={{user, setUser, ready}}>
            {children}
        </UserContext.Provider>
    )
}