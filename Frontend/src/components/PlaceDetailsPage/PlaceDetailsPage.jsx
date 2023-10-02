import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { API } from "../../api"
import { generateStars } from "../util"

import Spinner from "../Spinner"
import Block from "./Block"
import InfoLine from "./InfoLine"
import ProgressBar from "./PrograssBar"
import Review from "./ReviewBlock"

export default function ViewLocation(){

    const { LocationId } = useParams()

    const INITIAL_STATE = {
        details : {name:'', cuisine: '',},
        contacts:{location: null, email: null, phone_number: null, website: null}
    }

    const [locationData, setLocationData] = useState(INITIAL_STATE)
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
                    },
                    contacts: {
                        location: response.data.location,
                        email: response.data.email,
                        phone_number: response.data.phone_number,
                        website: response.data.website,
                    },
                }

                setLocationData(loadLocationData)
                setIsLoading(false)

            }
            catch(error){
                console.log(error)
            }
        }

        fetchLocationData()

    },[])

    const starRating = generateStars(4.9, 18)
    const contactDetails = Object.entries(locationData.contacts).map(([key, value]) => value && <InfoLine key={key} name={key} info={value}/>)


    return(
        <section className="px-5 pt-5 md:flex md:justify-center">

            { isLoading
                ? <Spinner />
                : 
                <>
                    <div className="md:w-11/12">

                        <div className="mb-5 flex flex-col gap-2">
                            <h1 className="text-2xl font-bold text-gray-800">{locationData.details.name}</h1>
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
                                        
                                        <div className="flex items-center my-3">
                                            <span className="text-gray-600 text-2xl font-bold mr-3">4.9</span>
                                            <span className="flex text-green-600 mr-3">{starRating}</span>
                                            <span className="text-sm text-gray-600 font-bold mr-3">0 Reviews</span>
                                        </div>

                                        <div className="my-3">
                                            
                                            <div className="flex gap-5 text-sm items-center my-3">
                                                <span>Excelent</span>
                                                <ProgressBar value={50}/>
                                                <span>5</span>
                                            </div>
                                            <div className="flex gap-5 text-sm items-center my-3">
                                                <span>Excelent</span>
                                                <ProgressBar value={30}/>
                                                <span>4</span>
                                            </div>
                                            <div className="flex gap-5 text-sm items-center my-3">
                                                <span>Excelent</span>
                                                <ProgressBar value={10}/>
                                                <span>3</span>
                                            </div>
                                            <div className="flex gap-5 text-sm items-center my-3">
                                                <span>Excelent</span>
                                                <ProgressBar value={5}/>
                                                <span>2</span>
                                            </div>
                                            <div className="flex gap-5 text-sm items-center my-3">
                                                <span>Excelent</span>
                                                <ProgressBar value={5}/>
                                                <span>1</span>
                                            </div>
                                        </div>

                                        {/* <div className="text-sm text-gray-500 mb-5">What did you think of your meal at {locationData.name}? Be the first to write a review and help other diners decide if it's the right place for them.</div> */}

                                        <button className="w-full rounded py-2.5 my-3 font-semibold bg-green-600 hover:bg-green-700 text-white focus:outline-green-700" onClick={() => navigate('/write/' + LocationId)}>Write a review</button>
                                    </Block>
                                </div>
                            </div>


                            <div className="md:flex">
                                <div className="md:basis-3/5 mb-4">
                                    <Block>

                                        <div className="text-gray-800 text-lg font-bold mb-3 align-middle">Reviews (10)</div>
                                        <hr/>
                                        <Review />
                                        <Review />
                                        <Review />
                                        <Review />
                                        
                                    </Block>
                                </div>                                  
                            </div>
                    </div>
                </>
            }
            
        </section>
    )
}