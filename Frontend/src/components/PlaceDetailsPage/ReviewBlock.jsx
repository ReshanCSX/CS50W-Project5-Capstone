import { generateStars } from "../util"



const Review = (props) => {

    const {reviewer, content, rating, timestamp} = props

    return(
        <div className="text-gray-600">

            <div className="my-4 flex items-center">
                <p className="font-bold">{reviewer}</p>
                
            </div>

            <div className="flex my-4">
                    <span className="flex mr-4 text-green-600">{generateStars(rating)}</span>
                    <p className="text-xs font-bold">Reviewed {timestamp}</p>
            </div>

            <div className="">
                <p className="break-words max-w-2xl">{content}</p>
            </div>

            <hr className="my-6" />

        </div>
    )
}

export default Review