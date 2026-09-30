import { Link, NavLink, Outlet } from 'react-router-dom'

const navClass = ({ isActive }) => `rounded-lg px-3 py-2 text-sm font-bold transition ${isActive ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-white'}`

export default function AuthLayout() {
  return <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50 px-4 py-10">
    <div className="mx-auto mb-8 flex max-w-md items-center justify-between">
      <Link to="/" className="text-xl font-black text-indigo-600">RouteShop React</Link>
      <nav className="flex gap-1"><NavLink to="/sign-in" className={navClass}>Sign In</NavLink><NavLink to="/sign-up" className={navClass}>Sign Up</NavLink></nav>
    </div>
    <div className="mx-auto max-w-md"><Outlet /></div>
  </main>
}
