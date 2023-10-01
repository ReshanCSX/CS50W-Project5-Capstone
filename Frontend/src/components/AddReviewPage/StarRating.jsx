import { useState } from "react"


const StarRating = (props) => {

    const {rating, handleClickRating} = props
    const [hover, setHover] = useState(0)

    return(
        <div className="flex">

            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1

                return(
                    <label key={i}>
                        <input
                            className="hidden" 
                            type="radio" 
                            name="rating" 
                            value={ratingValue} 
                            onClick={() => handleClickRating(ratingValue)}
                        />

                        <svg

                            xmlns="http://www.w3.org/2000/svg"
                            width={40}
                            height={40}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            className={`cursor-pointer transition-colors duration-200 ease-in-out ${ratingValue <= (hover || rating) ? 'text-green-600' : 'text-gray-200'}`}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(0)}
                        >
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                        </svg>
                    </label>
                )
            })}

        </div>
    )
}

export default StarRating