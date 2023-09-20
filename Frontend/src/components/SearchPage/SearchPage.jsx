import { useEffect, useState } from "react"
import { useLocation, Link } from "react-router-dom"
import SearchedCard from "./SeachedCard"
import axios from "axios"
import Spinner from "../Spinner"

const URL = "https://api.seeker.com:8000"

export default function Search(){

  const { search } = useLocation();
  const searchQ = new URLSearchParams(search).get("q")
  const [cardInfo, setCardInfo] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {

    const fetchData = async () => {
      if(searchQ){
        try{
          const response = await axios.get(`${URL}/search${search}`)
          setCardInfo(response.data)
          setIsLoading(false)
        }
        catch(error){
          console.log(error)
        }  
      }

    }

    fetchData()

  },[])
  
  
  const cards = cardInfo?.map(info => <SearchedCard key={info.id} {...info}/>)

  return(
    <>

      <section className="px-5 pt-10 md:pl-20">
        <div className="w-full md:w-3/4">
          <h1 className="text-gray-600 text-2xl font-bold mb-3">
            {searchQ 

              ? `Results matching "${searchQ}"`
              : "We need more information to help you. What are you looking for?"
              
              }
          </h1>
          <div className="flex">
            <h2 className="text-gray-600 text-sm font-light mb-6">Is Seeker missing a place?</h2>
            <Link to="/create" className="text-sm underline underline-offset-4 text-green-600 hover:text-green-700 ml-3">Add a place</Link>
          </div>
        </div>
      </section>
      
      { isLoading

        ? <Spinner />
        : <section className="px-5 md:pl-20">
            {cards.length != 0 ? cards : <p className="text-center text-gray-600 py-5">No results found</p>}
          </section>  
          
      }
    </>
    )
}