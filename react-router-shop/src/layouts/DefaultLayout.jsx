import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

export default function DefaultLayout() {
  return <><Header /><main className="min-h-[calc(100vh-160px)]"><Outlet /></main><footer className="border-t border-slate-200 bg-white"><div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-500">Day 34 Routing Practice · React + React Router + Tailwind CSS</div></footer></>
}
