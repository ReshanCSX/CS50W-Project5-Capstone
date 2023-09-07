export default function HomeHeader(props){

    return(
        <section className="p-3">
            <div>
                <h1 className="font-black text-3xl text-green-700 text-center my-10">Discover the best food in town</h1>
                <form>
                    <input
                    required
                    className="p-3 w-full border-2 border-green-600 rounded focus:outline-green-900"
                    type="text"
                    placeholder="Search for Destinations."
                    value={props.searchTerm}
                    onChange={props.updateSearchTerm}
                    onFocus={props.handleClickedSearch}
                    />
                    
                    {
                    props.isSearchOpen &&
                    <>
                        <input
                        className="p-3 border-2 border-green-600 w-full rounded focus:outline-green-900 mt-3"
                        type="text"
                        placeholder="Location"
                        value={props.searchLocation}
                        onChange={props.updateLocation}
                        />
                       
                    </>
                    }
                    <div className="my-4 flex gap-2 justify-center">
                        <button className="bg-green-600 p-2 w-28 text-white rounded hover:bg-green-700">Find</button>
                        
                        { props.isSearchOpen &&
                            <button className="border border-red-600  w-28 p-2 text-red-600 rounded hover:bg-red-600 hover:text-white" onClick={props.handleCloseSearch}>Close</button>
                        }

                    </div>
                </form>
        </div>
      </section>
    )
}