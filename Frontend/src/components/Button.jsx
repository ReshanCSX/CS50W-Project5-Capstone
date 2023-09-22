export default function Button(props){

    const {name} = props

    return(
        <div className="mt-8">
            <button
                className="w-full sm:w-1/3 rounded-full py-2.5 font-bold bg-green-600 hover:bg-green-700 text-white">
                {name}
            </button>
        </div>
    )
}