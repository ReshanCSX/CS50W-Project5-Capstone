export default function Button(props){

    const {name} = props

    return(
        <div className="mt-6 flex justify-center">
            <button
                className="w-full sm:w-1/3 rounded-full py-2.5 font-bold bg-green-600 hover:bg-green-700 text-white focus:outline-green-700">
                {name}
            </button>
        </div>
    )
}