import { NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const base = 'rounded-lg px-3 py-2 text-sm font-semibold transition'
const classes = ({ isActive }) => `${base} ${isActive ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'}`

export default function Header() {
  const { count } = useCart()
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <NavLink to="/" className="text-xl font-black tracking-tight text-indigo-600">RouteShop React</NavLink>
        <nav className="flex flex-wrap gap-1">
          <NavLink to="/" end className={classes}>Home</NavLink>
          <NavLink to="/products" className={({ isActive }) => classes({ isActive })}>Products</NavLink>
          <NavLink to="/cart" className={classes}>Cart <span className="ml-1 rounded-full bg-current/10 text-xs">({count})</span></NavLink>
          <NavLink to="/sign-in" className={classes}>Sign In</NavLink>
          <NavLink to="/sign-up" className={classes}>Sign Up</NavLink>
        </nav>
      </div>
    </header>
  )
}
