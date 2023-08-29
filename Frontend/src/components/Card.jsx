export default function Card(props){

    return (
    <div>
        <h1 className="text-xl font-bold text-red-500 underline">{props.name}</h1>
        <p>{props.rating}/5</p>
    </div>
    )
}