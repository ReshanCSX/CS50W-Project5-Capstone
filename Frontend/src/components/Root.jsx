import { Link, Outlet } from "react-router-dom";
import Navbar from "./Navbar"
import { useEffect } from "react";
import axios from 'axios';


export default function App() {

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}