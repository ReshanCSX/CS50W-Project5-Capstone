import { Navigate, useParams, useNavigate, useLoaderData } from "react-router-dom"
import { API } from "../../api"

import Button from "../Button"
import StarRating from "./StarRating"
import { useEffect, useState } from "react"
import Spinner from "../Spinner"
import { useAuth } from "../../auth/AuthContext"

export default function AddReviewPage(){

    const { LocationId } = useParams()
    const navigate = useNavigate()
    const [locationData, setLocationData] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState("")
    const [reviewErrors, setReviewErrors] = useState("")

    // Check if the user authenticated
    const checkAuth = useLoaderData()
    const [isAuth, setIsAuth] = useAuth()

    if (!checkAuth) {
      return <Navigate to={'/login?next=write/' + LocationId}/>
    }


    useEffect(()=> {
        async function fetchName(){
            try{
                const response = await API.get('location/' + LocationId)
                setLocationData(response.data)
                setIsLoading(false)
            } catch(error){
                console.log(error)
            }
        }

        fetchName()
    },[])


    const handleClickRating = (value) => {
        setRating(value)
    }


    const handleTextChange = (event) => {
        setReview(event.target.value)
    }


    const submitForm = async (event) => {
        event.preventDefault()

        setReviewErrors("")

        if(rating === 0){
            setReviewErrors("Please add a star rating to complete your review.")
            return
        }

        if(review.length < 85){
            setReviewErrors("Your review needs at least 85 characters. Add a few more thoughts to post review.")
            return
        }

        const body = {
            rating : rating,
            content : review
        }     

        try{
            const response = await API.post(`write/${LocationId}`, body)

            if(response.status === 401){
                setIsAuth(false)
            }
            else if (response.status === 201) {
                navigate(`/location/` + LocationId)
            }

        }
        catch(error){
            console.log(error)
        }
        
    }

    return(

        <section className="px-5 mt-10 max-w-xl mx-auto">

            { isLoading
                ? <Spinner />
                :  <>
                        <div className="my-6">
                            <p className="text-xl font-bold text-gray-800">Share Your Experience : {locationData.name}</p>
                        </div>
                        <form onSubmit={submitForm} className="w-full">
                            <fieldset className="flex flex-col items-center ">
            
                                <div className="border shadow border-gray-300 p-5 rounded w-full">
            
                                    <div>
                                        <p className="text-gray-600 font-bold text-sm mb-4">Select your rating</p>
                                        <StarRating rating={rating} handleClickRating={handleClickRating}/>
                                    </div>
            
                                    <div className="block w-full my-4">
                                        <textarea
                                            rows="5"
                                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-green-600 focus:outline-green-700"
                                            placeholder="Write your thoughts here..."
                                            value={review}
                                            onChange={handleTextChange}
                                        />
                                    </div>
                                </div>
                                {reviewErrors && <p className="text-red-500 text-xs mt-4">{reviewErrors}</p>}
            
                                <div className="block w-full">
                                    <Button name="Post Review" />
                                </div>
            
                            </fieldset>
                        </form>
                </>
            
            }
        </section>
    )
}