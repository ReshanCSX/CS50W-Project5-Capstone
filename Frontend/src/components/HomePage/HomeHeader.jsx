export default function HomeHeader(props){

    return(
        <>  

            <div className="flex flex-col items-center justify-center">
                <div className="max-w-lg">

                    <h1 className="mt-0 font-black md:leading-snug text-4xl md:text-5xl text-green-700 text-center my-10">Plan Your Next Meal <span className="text-green-900">With Confidence</span></h1>
                    
                    <form onSubmit={props.handleSubmit} className="grid grid-cols-1 gap-6 md:gap-2 md:grid-cols-12">
                        
                        <input
                            required
                            className="md:col-span-9 p-3 border-2 border-green-600 rounded focus:outline-green-800"
                            type="text"
                            placeholder="Search for Resturents, Locations, Cuisines"
                            value={props.searchQuery}
                            onChange={props.updateSearchQuery}
                        />
                        
                        <div className="flex justify-center md:col-span-3">
                            <button className="bg-green-600 p-2 w-28 h-12 md:h-auto font-bold text-white rounded hover:bg-green-700">Search</button>
                        </div>
                    </form>
                </div>
            </div>
            
        
        </>
        
    )
}