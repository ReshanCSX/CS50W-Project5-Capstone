export default function HomeHeader(props){

    return(
        
        <div>
            <h1 className="font-black text-3xl text-green-700 text-center my-10">Discover the best food in town</h1>

            <form onSubmit={props.handleSubmit} className={`grid grid-cols-1 gap-4 ${props.isSearchOpen && "md:grid-cols-2"}`}>
                <input
                className="p-3 border-2 border-green-600 rounded focus:outline-green-800"
                type="text"
                placeholder="Search for Destinations."
                value={props.name}
                onChange={props.updateSearchName}
                onFocus={props.handleClickedSearch}
                />
                
                {
                props.isSearchOpen &&
                <>
                    <input
                    className="p-3 border-2 border-green-600 rounded focus:outline-green-800"
                    type="text"
                    placeholder="Location"
                    value={props.location}
                    onChange={props.updateSearchLocation}
                    />
                
                </>
                }
                <div className="my-4 flex gap-2 justify-center md:col-span-2">
                    <button className="bg-green-600 p-2 w-28 text-white rounded hover:bg-green-700">Find</button>
                    
                    { props.isSearchOpen &&
                        <button className="border border-red-600  w-28 p-2 text-red-600 rounded hover:bg-red-600 hover:text-white" onClick={props.handleCloseSearch}>Close</button>
                    }

                </div>
            </form>
        </div>
    )
}