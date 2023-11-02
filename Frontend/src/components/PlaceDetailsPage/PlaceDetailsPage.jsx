import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { API } from "../../api"
import { generateStars } from "../util"

import Spinner from "../Spinner"
import Block from "./Block"
import InfoLine from "./InfoLine"
import Review from "./ReviewBlock"
import RatingSection from "./RatingSection"
import Favorite from "./Favorite"

export default function ViewLocation(){

    const { LocationId } = useParams()

    const INITIAL_STATE = {
        details : {name:'', cuisine: '', rating: 0, eachRating:[], is_favorited: null},
        contacts:{location: null, email: null, phone_number: null, website: null},
        reviews:[]
    }

    const [locationData, setLocationData] = useState(INITIAL_STATE)
    const [reviewCount, setReviewCount] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {

        const fetchLocationData = async () => {

            try{
                const response = await API.get(`location/${LocationId}`)


                const loadLocationData = {
                    details: {
                        name: response.data.name,
                        cuisine: response.data.cuisine,
                        rating: response.data.rating,
                        eachRating: response.data.eachRating,
                        is_favorited : response.data.is_favorited
                    },
                    contacts: {
                        location: response.data.location,
                        email: response.data.email,
                        phone_number: response.data.phone_number,
                        website: response.data.website,
                    },
                    reviews: response.data.reviews
                }

                setLocationData(loadLocationData)
                setReviewCount(loadLocationData.reviews.length)
                setIsLoading(false)

            }
            catch(error){
                console.log(error)
            }
        }

        fetchLocationData()

    },[])

    const handle_favorite = () => {
        setLocationData(prev => ({...prev, 
            
            details : {
                ...prev.details,
                is_favorited: !prev.details.is_favorited
        }
        
        }))
    }

    useEffect(() => {
        const changeFavoriteState = async () => {
            try{

                const data = {favorites : LocationId}
                const response = await API.put('favorites', data)

                console.log(response)
            }
            catch(error){
                console.log(error)
            }
        }

        changeFavoriteState()

    },[locationData.details.is_favorited])

    const starRating = generateStars(locationData.details.rating, 18)
    const contactDetails = Object.entries(locationData.contacts).map(([key, value]) => value && <InfoLine key={key} name={key} info={value}/>)


    return(
        <section className="px-5 pt-5 md:flex md:justify-center">

            { isLoading
                ? <Spinner />
                : 
                <>
                    <div className="md:w-11/12">

                        <div className="mb-5 flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-red-600">
                                <h1 className="text-2xl font-bold text-gray-800">{locationData.details.name}</h1>
                                {!(locationData.details.is_favorited === null) && <Favorite is_favorited={locationData.details.is_favorited} handle_favorite={handle_favorite}/>}
                            </div>
                            <p className="text-sm text-gray-600 font-semibold">{locationData.details.cuisine}</p>
                        </div>

                        

                        <div className="md:flex md:gap-3 md:flex-row-reverse">

                            <div className="md:basis-2/5 mb-4">
                                    <Block>
                                        <div>
                                            <div className="text-gray-800 text-lg font-bold mb-5">Location and Contacts</div>
                                            {contactDetails}
                                        </div>
                                    </Block>
                                </div>

                                <div className="md:basis-3/5 mb-4">
                                    <Block>
                                        <div className="text-gray-800 text-lg font-bold mb-3">Ratings and reviews</div>
                                        
                                        { locationData.details.rating
                                            ?   <>
                                                    <div className="flex items-center my-3">
                                                        <span className="text-gray-600 text-2xl font-bold mr-3">{locationData.details.rating}</span>
                                                        <span className="flex text-green-600 mr-3">{starRating}</span>
                                                        <span className="text-sm text-gray-600 font-bold mr-3">{reviewCount} Reviews</span>
                                                    </div>

                                                    <RatingSection eachRating={locationData.details.eachRating} reviewCount={reviewCount}/>
                                                </>

                                            : <div className="text-sm text-gray-500 mb-5">What did you think of your meal at {locationData.details.name}? Be the first to write a review and help other diners decide if it's the right place for them.</div>
                                        }

                                        <button className="w-full rounded py-2.5 my-3 font-semibold bg-green-600 hover:bg-green-700 text-white focus:outline-green-700" onClick={() => navigate('/write/' + LocationId)}>Write a review</button>
                                    </Block>
                                </div>
                            </div>


                            <div className="md:flex">
                                <div className="md:basis-3/5 mb-4">
                                    <Block>

                                        <div className="text-gray-800 text-lg font-bold mb-3 align-middle">Reviews ({reviewCount})</div>
                                        <hr/>

                                        {   reviewCount

                                            ?   locationData.reviews.map((review, i) => {
                                                    return <Review key={i} {...review} />
                                                })

                                            : <div className="text-center text-sm text-gray-600 mt-10 mb-4">No reviews yet. Your insights could be the first!</div>
                                        
                                        }
                                        
                                    </Block>
                                </div>                                  
                            </div>
                    </div>
                </>
            }
            
        </section>
    )
}