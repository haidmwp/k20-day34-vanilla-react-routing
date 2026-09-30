import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

export default function HomePage() {
  return <>
    <section className="bg-slate-950 px-4 py-20 text-white sm:py-28"><div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2"><div><p className="mb-4 text-sm font-bold uppercase tracking-[.25em] text-indigo-300">Simple shopping, better essentials</p><h1 className="text-4xl font-black tracking-tight sm:text-6xl">React Router makes every view feel instant.</h1><p className="mt-6 max-w-xl text-lg text-slate-300">Browse products, open dynamic routes and keep your cart while React Router handles navigation without a full-page reload.</p><div className="mt-8 flex flex-wrap gap-3"><Link to="/products" className="rounded-xl bg-indigo-500 px-5 py-3 font-bold hover:bg-indigo-400">Shop products</Link><Link to="/sign-up" className="rounded-xl border border-white/20 px-5 py-3 font-bold hover:bg-white/10">Create account</Link></div></div><img src={products[0].thumbnail} alt={products[0].name} className="h-80 w-full rounded-3xl object-cover shadow-2xl" /></div></section>
    <section className="mx-auto max-w-6xl px-4 py-16"><p className="mb-2 text-sm font-bold uppercase tracking-[.2em] text-indigo-600">Featured</p><h2 className="mb-8 text-3xl font-black">Popular picks</h2><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{products.slice(0,3).map((product) => <ProductCard key={product.id} product={product} />)}</div></section>
  </>
}
