import Star from "./Star"

export function generateStars(rating){
    const stras=[]
    const numFullStars = Math.floor(rating)
    const hasHalfStars = (rating % 1 != 0)
    const starCount = numFullStars + (hasHalfStars ? 1 : 0)

    for(let i = 0; i < numFullStars; i++){
        stras.push(<Star type={"fill"} key={`fillStar${i}`}/>)
    }

    if(hasHalfStars){
        stras.push(<Star type={"half-fill"} key="halfFill"/>)
    }

    if(starCount < 5){
        for(let i = 0; i < (5 -starCount); i++){
            stras.push(<Star type={"empty"} key={`emptyStar${i}`}/>)
        }
    }

    return stras
}

export function getParams(location, keyword){

    const { search } = location
    const param = new URLSearchParams(search).get(keyword)

    return param
}