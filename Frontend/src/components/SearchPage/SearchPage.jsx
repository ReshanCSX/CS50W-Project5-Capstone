import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import SearchedCard from "./SeachedCard"
import axios from "axios"

const URL = "http://127.0.0.1:8000"

export default function Search(){

  const { search } = useLocation();
  const searchQ = new URLSearchParams(search).get("q")
  const [cardInfo, setCardInfo] = useState([])

  useEffect(() => {

    async function fetchData(){
      if(searchQ){
        try{
          const response = await axios.get(`${URL}/search${search}`)
          setCardInfo(response.data)
        }
        catch(error){
          console.log(error)
        }  
      }

    }
  
    fetchData()
  },[])
  
  
  const cards = cardInfo?.map(info => <SearchedCard key={info.id} {...info}/>)
  console.log(cards)

  return(
    <>

      <section className="px-5 pt-5 lg:pl-20">
        <h1 className="text-gray-600 text-xl font-light mb-6">
          {searchQ 

            ? `Results matching "${searchQ}"`
            : "We need more information to help you. What are you looking for?"
            
            }
        </h1>
      </section>

      <section className="px-5 lg:pl-20">
        {cards.length != 0 ? cards : <p className="text-center text-gray-600 py-5">No results found</p>}
      </section>  
    </>
    )
}