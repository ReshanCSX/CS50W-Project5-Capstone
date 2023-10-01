import { useParams, useNavigate } from "react-router-dom"
import { API } from "../../api"

import Button from "../Button"
import StarRating from "./StarRating"
import { useState } from "react"

export default function AddReviewPage(){

    const { LocationId } = useParams()
    const navigate = useNavigate()
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState("")
    const [reviewErrors, setReviewErrors] = useState("")


    const handleClickRating = (value) => {
        setRating(value)
    }


    const handleTextChange = (event) => {
        setReview(event.target.value)
    }


    const submitForm = async (event) => {
        event.preventDefault()

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
            
            setReviewErrors("")

            if (response.status === 200) {
                navigate(`location/` + LocationId)
              }

        }
        catch(error){
            console.log(error)
        }
        
    }

    return(

        <section className="px-5 mt-10 max-w-lg mx-auto">

            <form onSubmit={submitForm} className="w-full">
                <fieldset className="flex flex-col items-center ">

                    <StarRating rating={rating} handleClickRating={handleClickRating}/>

                    <div className="block w-full my-4">
                        <textarea
                            rows="5"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-green-600 focus:outline-green-800"
                            placeholder="Write your thoughts here..."
                            value={review}
                            onChange={handleTextChange}
                        />
                    </div>

                    {reviewErrors && <p className="text-red-500 text-xs mt-1">{reviewErrors}</p>}

                    <div className="block w-full">
                        <Button name="submit" />
                    </div>

                </fieldset>
            </form>

        </section>
    )
}