import { Link } from 'react-router-dom'

export default function Navbar(){

  const menuItems = ["Login", "Sign up"]
  return(
    <nav className="bg-green-600 py-3 px-5 flex justify-between items-center">
      <Link to="/">
        <h1 className="text-lg font-bold text-white">Seeker</h1>
      </Link>
      <div>
        {menuItems.map(item => (
          <a key={item} href="#" className="pl-5 text-white hover:text-green-200">{item}</a>
        ))}
      </div>
    </nav>
  )
}