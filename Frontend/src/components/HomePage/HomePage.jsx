import { useState, useEffect } from "react";

import Card from "./Card";
import HomeHeader from "./HomeHeader";
import axios from "axios";

const URL = "http://127.0.0.1:8000";

export default function HomePage(){

  const [isSearchOpen, setSearchOpen] = useState(false)
  // const [searchQuery, setSearchQuery] = useState("")
  const [searchQuery, setSearchQuery] = useState({name:"", location:""})
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

  async function Search(event){
    event.preventDefault()
    
    try{
      const response = await axios.get(`${URL}?name=${searchQuery.name}&location=${searchQuery.location}`)
      setCardInfo(response.data)
    }
    catch(error){
      console.log(error)
    }
  }

  function handleClickedSearch(){
    setSearchOpen(true)
  }

  function handleCloseSearch(){
    setSearchOpen(false)
  }

  function updateSearchName(event){
    setSearchQuery({...searchQuery, name:event.target.value})
  }

  function updateSearchLocation(event){
    setSearchQuery({...searchQuery, location:event.target.value})
  }

  // Generating cards
  const cards = cardInfo.map(info => <Card key={info.id} {...info}/>)

  return (
    <>
      <section className="p-3 border-b-2 border-green-600">
        <HomeHeader
          {...searchQuery}

          isSearchOpen={isSearchOpen}

          updateSearchName={updateSearchName}
          updateSearchLocation={updateSearchLocation}
          
          handleClickedSearch={handleClickedSearch} 
          handleCloseSearch={handleCloseSearch}
          handleSubmit={Search}
        />
      </section>

      <section className="p-3">
        <h1 className="pt-3 font-bold text-green-700 text-xl">You might like these</h1>
        {cards}
      </section>
    </>
  )
}