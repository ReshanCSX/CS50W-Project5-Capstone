import ProgressBar from "./PrograssBar"

const RatingSection = (props) => {
    
    const {eachRating, reviewCount} = props
    const labelList = {5: 'Excelent', 4: 'Very Good', 3: 'Good', 2: 'Poor', 1: 'Terrible'}
    
    
    return(
        <div className="text-sm items-center my-6">
        
            {[5, 4, 3, 2, 1].map((rating) => {

                const ratingObject = eachRating.find(item => item.rating === rating)
                const count = ratingObject ? ratingObject.count : 0

                return (
                    <div key={rating} className="w-full grid grid-cols-12 my-3 gap-5 items-center">
                        <span className="col-span-3 lg:col-span-2">{labelList[rating]}</span>
                        <ProgressBar value={(count/reviewCount*100)}/>
                        <span className="col-span-1 text-end">{count}</span>
                    </div>
                )
            })}

        </div>

    )
}

export default RatingSection