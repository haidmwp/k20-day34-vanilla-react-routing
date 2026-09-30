import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function AuthForm({ type }) {
  const [message, setMessage] = useState('')
  const isSignUp = type === 'sign-up'

  const submit = (event) => {
    event.preventDefault()
    if (!event.currentTarget.reportValidity()) return
    setMessage('Form validated successfully.')
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/50 sm:p-9">
      <p className="text-sm font-bold uppercase tracking-[.2em] text-indigo-600">{isSignUp ? 'Join us' : 'Welcome back'}</p>
      <h1 className="mt-2 text-3xl font-black">{isSignUp ? 'Create your account' : 'Sign in to RouteShop'}</h1>
      <p className="mt-2 text-sm text-slate-500">This demo validates required fields only. No real authentication is performed.</p>
      <form className="mt-7 space-y-5" onSubmit={submit}>
        {isSignUp && <label className="block text-sm font-bold">Full name<input required className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" placeholder="Your name" /></label>}
        <label className="block text-sm font-bold">Email<input type="email" required className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" placeholder="you@example.com" /></label>
        <label className="block text-sm font-bold">Password<input type="password" minLength="6" required className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" placeholder="Minimum 6 characters" /></label>
        <button className="w-full rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white hover:bg-indigo-700">{isSignUp ? 'Create account' : 'Sign in'}</button>
        <p className="min-h-6 text-center text-sm font-semibold text-emerald-600">{message}</p>
      </form>
      <p className="mt-3 text-center text-sm text-slate-500">{isSignUp ? 'Already have an account?' : 'New to RouteShop?'} <Link className="font-bold text-indigo-600" to={isSignUp ? '/sign-in' : '/sign-up'}>{isSignUp ? 'Sign in' : 'Sign up'}</Link></p>
    </div>
  )
}
