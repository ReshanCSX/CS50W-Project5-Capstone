import { useEffect, useState } from "react"
import { useLocation, Link, useNavigate } from "react-router-dom"
import SearchedCard from "./SeachedCard"
import Spinner from "../Spinner"
import { API } from "../../api"
import { getParams } from "../util"


export default function Search(){

  const searchParam = getParams(useLocation(), 'q')
  const [cardInfo, setCardInfo] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  
  useEffect(() => {

    const fetchData = async () => {
      if(searchParam){
        try{
          const response = await API.get(`/search?q=${searchParam}`)
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

  const handleCardClick = (id) => {
    navigate(`/location/${id}`)
  }
  
  const cards = cardInfo?.map(info => <SearchedCard key={info.id} {...info} handleCardClick={handleCardClick}/>)

  return(
    <>

      <section className="px-5 pt-10 md:pl-20">
        <div className="w-full md:w-3/4">
          <h1 className="text-green-600 text-2xl font-bold mb-3">
            {searchParam 

              ? `Results matching "${searchParam}"`
              : "We need more information to help you. What are you looking for?"
              
              }
          </h1>
          <div className="flex">
            <h2 className="text-gray-600 text-sm font-light mb-6">Is Seeker missing a place?</h2>
            <Link to="/create" className="text-sm underline underline-offset-4 text-green-600 hover:text-green-800 ml-3">Add a place</Link>
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