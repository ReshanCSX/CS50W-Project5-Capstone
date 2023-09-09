export default function Card(props){
    
    return (
    <div className="border border-green-700">
        <div>
            <img className="max-h-20 w-full object-cover" alt={`image of the ${props.name}`} src="https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
        </div>
        <div className="p-3">
            <h1 className="text-xl font-bold text-green-700">{props.name}</h1>
            <h1 className="text-sm text-gray-600">{props.city}</h1>
            <h3 className="font-bold text-base text-gray-600">{props.rating}/5</h3>
        </div>
    </div>
    )
}
