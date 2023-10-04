import { Link, useNavigate } from 'react-router-dom'
import React from 'react';
import { useAuth } from '../auth/AuthContext';

export default function Navbar(){

  const [isAuthed, setIsAuth] = useAuth()
  const navigate = useNavigate()

  const menuItems = [{"Login" : "login"}, {"Sign up" : "register"}]

  function logout(){
    localStorage.removeItem('authTokens')
    setIsAuth(false)
    navigate('/')
  }
  
  return(
    <nav className="bg-green-600 py-3 px-5 flex justify-between items-center">
      <Link to="/">
        <h1 className="text-lg font-bold text-white">Seeker</h1>
      </Link>
      <div>
        {
          isAuthed
            ? <a onClick={() => logout()} className="pl-5 text-white hover:text-green-200 cursor-pointer">Log Out</a>

            : menuItems.map((item, index) => {
              const key = Object.keys(item)[0]
              const value = Object.values(item)[0]

              return <Link key={index} to={value} className="pl-5 text-white hover:text-green-200">{key}</Link>
            })
        }
      </div>
    </nav>
  )
}