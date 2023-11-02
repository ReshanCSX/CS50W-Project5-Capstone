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
  const [searchQuary, setSearchQuary] = useState("")
  const [searchedQ, setSearchedQ] = useState(searchParam)
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
      } else(
        setIsLoading(false)
      )

    }

    fetchData()

  },[])

  const handleCardClick = (id) => {
    navigate(`/location/${id}`)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try{
      setIsLoading(true)
      const response = await API.get(`/search?q=${searchQuary}`)
      setCardInfo(response.data)
      setSearchedQ(searchQuary)
      setIsLoading(false)

    } catch(error){
      console.log(error)
    }
  }
  
  const cards = cardInfo?.map(info => <SearchedCard key={info.id} {...info} handleCardClick={handleCardClick}/>)

  return(
    <>

      <section className="px-5 pt-10 md:pl-20">
        <div className="w-full md:w-3/4">
          <h1 className="text-green-600 text-2xl font-bold mb-3">
            {searchParam 

              ? `Results matching "${searchedQ}"`
              : "We need more information to help you. What are you looking for?"
              
              }
          </h1>

          <div className="my-6">
            <form onSubmit={handleSubmit}>
              <div className="">
                <div className="border shadow p-4 md:pl-4 md:pr-1 md:py-1 w-full rounded md:rounded-full  md:flex md:items-center">
                  
                  <div className="flex items-center w-full">
                    <div className="text-green-600">
                      <svg xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 16 16">

                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                      </svg>
                    </div>

                    <input
                      type="text"
                      placeholder="What are you looking for?"
                      className="focus:outline-0 pl-4 p-2 rounded-full w-full"
                      value={searchQuary}
                      onChange={(event) => setSearchQuary(event.target.value)}
                      required={true}
                    />
                  </div>  

                  <hr className="my-4 block md:hidden" />

                  <div className="">
                    <button className="bg-green-600 w-full py-2 md:px-10 h-12 font-bold text-white rounded-full hover:bg-green-700">Search</button>
                  </div>

                </div>

              </div>
            </form>
          </div>

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