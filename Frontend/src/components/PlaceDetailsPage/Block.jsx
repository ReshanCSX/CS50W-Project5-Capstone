const Block = ({ children, className }) => {
    return (
      <div className={`border shadow border-gray-300 p-5 rounded ${className}`}>
        {children}
      </div>
    )
  }

export default Block