import { useEffect, useState } from "react";
import Card from "../components/Card";

const URL = "http://127.0.0.1:8000";

export default function Home(){

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

    return(cards)
}