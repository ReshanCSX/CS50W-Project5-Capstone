import generateStars from "../util"

export default function SearchedCard(props){

    const { name, rating, location } = props

    return (
        <div className="border flex w-full md:w-3/4">
            <div className="p-2">
                <img className="h-28 w-36 md:h-24 md:w-26 object-cover" alt={`image of the ${name}`} src="https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
            </div>
            <div className="p-5 flex flex-col gap-1 justify-center">
                <h1 className="text-base font-bold text-slate-700">{name}</h1>
                <h3 className="font-bold text-sm text-green-600 flex">
                    {generateStars(rating)}
                    <span className="pl-2">{rating}</span>
                </h3>
                <h1 className="text-sm text-gray-600">{location}</h1>
            </div>
        </div>
    )
}
