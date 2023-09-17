export default function TextField(props){

    const {name, type, label, required, handleChange, value} = props

    return(
        <div className="mb-3">
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-700">{label}</label>
            <input
                type={type || "text"}
                name={name} 
                value={value[name]}
                onChange={handleChange}
                id={name}
                className="w-full bg-gray-50 border border-green-600 text-gray-900 text-sm rounded p-2.5 focus:outline-green-700"
                required={required ? true : false}
            />
        </div>
    )
}