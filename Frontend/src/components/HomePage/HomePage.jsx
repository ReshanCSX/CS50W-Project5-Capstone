import { useState, useEffect } from "react";

import Card from "./Card";
import HomeHeader from "./HomeHeader";

const URL = "http://127.0.0.1:8000";

export default function HomePage(){

  const [isSearchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState({name:"", location:""})
  const [cardInfo, setCardInfo] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const request = await fetch(`${URL}`)
      const response = await request.json();
  
      setCardInfo(response)
    }
  
        fetchData();
  },[])
  
  
  const cards = cardInfo.map(info => <Card key={info.id} name={info.name} rating={info.rating}/>)

  
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

  
  return (
    <>
      <HomeHeader
        {...searchQuery}

        isSearchOpen={isSearchOpen}

        updateSearchName={updateSearchName}
        updateSearchLocation={updateSearchLocation}
        
        handleClickedSearch={handleClickedSearch} 
        handleCloseSearch={handleCloseSearch}
      />
      <section className="p-3">
        {cards}
      </section>
    </>
  )
}