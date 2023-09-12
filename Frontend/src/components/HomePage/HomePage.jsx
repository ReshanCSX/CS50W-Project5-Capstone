import { useState, useEffect } from "react"

import Card from "./Card"
import HomeHeader from "./HomeHeader"
import axios from "axios"

const URL = "http://127.0.0.1:8000"

export default function HomePage(){

  const [searched, setSearched] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [cardInfo, setCardInfo] = useState([])


  // Fetching resturent data 
  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await axios.get(`${URL}`)
        setCardInfo(response.data)
      }
      catch(error){
        console.log(error)
      }
    }

    fetchData();
  },[])

  async function search(event){
    event.preventDefault()
    
    try{
      const response = await axios.get(`${URL}/search?q=${searchQuery}`)
      setCardInfo(response.data)
      setSearched(true)
    }
    catch(error){
      console.log(error)
    }
  }

  function updateSearchQuery(event){
    setSearchQuery(event.target.value)
  }
  
  // Generating cards
  const cards = cardInfo.map(info => <Card key={info.id} {...info}/>)

  return (
    <>
      <section className="px-5 py-24 bg-green-200">
        <HomeHeader
          searchQuery = {searchQuery}
          updateSearchQuery={updateSearchQuery}
          handleSubmit={search}
        />
      </section>

      <section className="px-5 py-10 sm:px-10">

        {!searched && <h5 className="text-gray-600 text-xl underline underline-offset-8 font-light mb-6">
          Explore New Places
        </h5>}
        
        {cards.length
          ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {cards}
            </div>
          : <p className="text-center w-full text-lg text-gray-600 pt-6">No matching results found.</p>
        }

      </section>
    </>
  )
}