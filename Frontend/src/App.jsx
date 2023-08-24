import { useState, useEffect } from "react";

const URL = "http://127.0.0.1:8000";

export default function App() {

  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const request = await fetch(`${URL}`)
      const response = await request.json();

      setGreeting(response)
    }

        fetchData();
  },[])

  
  return (
    <main>
     <h1>{greeting.greating}</h1>
    </main>
  )
}