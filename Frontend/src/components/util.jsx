import Star from "./Star"

export function generateStars(rating, size){

    const stras=[]
    const numFullStars = Math.floor(rating)
    const hasHalfStars = (rating % 1 != 0)
    const starCount = numFullStars + (hasHalfStars ? 1 : 0)

    for(let i = 0; i < numFullStars; i++){
        stras.push(<Star type={"fill"} key={`fillStar${i}`} size={size}/>)
    }

    if(hasHalfStars){
        stras.push(<Star type={"half-fill"} key="halfFill" size={size}/>)
    }

    if(starCount < 5){
        for(let i = 0; i < (5 -starCount); i++){
            stras.push(<Star type={"empty"} key={`emptyStar${i}`} size={size}/>)
        }
    }

    return stras
}

export function getParams(location, keyword){

    const { search } = location
    const param = new URLSearchParams(search).get(keyword)

    return param
}