import generateStars from "../util"

export default function Card(props){

    const { name, rating, location } = props
    
    return (
    <div className="shadow-md border rounded-md">
        <div>
            <img className="h-40 w-full object-cover rounded-t-md" alt={`image of the ${name}`} src="https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
        </div>
        <div className="p-5 flex justify-between sm:block">
            <div className="">
                <h1 className="text-lg font-bold text-slate-700">{name}</h1>
                <h2 className="text-sm text-gray-600">{location}</h2>
            </div>
            <div>
                <h2 className="font-bold sm:mt-2 text-sm text-green-600 flex">
                    {generateStars(rating)}
                    <span className="pl-2">{rating}</span>
                </h2>
            </div>
        </div>
    </div>
    )
}
