import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import Card from "./Card"
import HomeHeader from "./HomeHeader"
import Spinner from "../Spinner"
import axios from "axios"

const URL = "http://127.0.0.1:8000"

export default function HomePage(){
  
  const [searchQuery, setSearchQuery] = useState("")
  const [cardInfo, setCardInfo] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()


  // Fetching resturent data 
  useEffect(() => {
    async function fetchData(){
      try{
        const response = await axios.get(`${URL}`)
        setIsLoading(false)
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
    navigate(`/search?q=${searchQuery}`)
  }

  function updateSearchQuery(event){
    setSearchQuery(event.target.value)
  }

  // Generating cards
  const cards = cardInfo?.map(info => <Card key={info.id} {...info}/>)

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

        { isLoading 

          ? <Spinner /> 
          
          : <>
            <h5 className="text-gray-600 text-xl underline underline-offset-8 font-light mb-6">
              Explore New Places
            </h5>
            
            {cards.length
              ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {cards}
                </div>
              : <p className="text-center w-full text-lg text-gray-600 pt-6">No matching results found.</p>
            }
          </>
        }
        

       

      </section>
    </>
  )
}