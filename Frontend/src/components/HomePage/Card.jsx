export default function Card(props){
    
    return (
    <div className="shadow-md border rounded-md">
        <div>
            <img className="h-40 w-full object-cover rounded-t-md" alt={`image of the ${props.name}`} src="https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
        </div>
        <div className="p-5">
            <div className="flex justify-between">
                <h1 className="text-lg font-bold text-slate-700">{props.name}</h1>
                <h3 className="font-bold text-base text-gray-600"> Rating {props.rating}/5</h3>
            </div>
            <div>
                <h1 className="text-sm text-gray-600">{props.location}</h1>
            </div>
        </div>
    </div>
    )
}
