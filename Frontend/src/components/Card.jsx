export default function Card(props){

    return (
    <div>
        <h1>{props.name}</h1>
        <p>{props.rating}/5</p>
    </div>
    )
}