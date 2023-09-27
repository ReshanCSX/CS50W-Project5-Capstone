const ProgressBar = ({ value }) => {
    return (
        <div className="w-full h-2 bg-green-100 rounded">
            <div className="h-full bg-green-600 rounded" style={{ width: `${value}%` }}/>
        </div>
    )
}

export default ProgressBar;