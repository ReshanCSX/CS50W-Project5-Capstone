import { Outlet} from "react-router-dom";
import Navbar from "./Navbar"
import { AuthProvider, useProviderAuth } from "../auth/AuthContext";

import { useEffect, useState } from "react";

export default function App() {

  const [isAuth, setIsAuth]  = useState(null)
  const auth = useProviderAuth()

  useEffect(() => {

    const getAuth = async () => {

      const response = await auth.isAuthed()
      setIsAuth(response)

    }

    getAuth();
  },[])


  return (
    <>
    <AuthProvider value={[isAuth, setIsAuth]}>
        <header>
          <Navbar/>
        </header>
        <main>
          <Outlet />
        </main>
      </AuthProvider>
    </>
  )
}