import { Link, Navigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import ProductPrice from '../components/ProductPrice'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'

export default function ProductDetailPage() {
  const { productId } = useParams()
  const product = products.find((item) => item.id === Number(productId))
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)
  if (!product) return <Navigate to="/not-found" replace />

  return <section className="mx-auto max-w-6xl px-4 py-14"><Link to="/products" className="mb-8 inline-flex font-semibold text-slate-500 hover:text-indigo-600">← Back to products</Link><div className="grid gap-10 lg:grid-cols-2"><img src={product.thumbnail} alt={product.name} className="h-[420px] w-full rounded-3xl object-cover shadow-sm" /><div className="self-center"><span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-bold text-indigo-700">Product #{product.id}</span><h1 className="mt-5 text-4xl font-black tracking-tight">{product.name}</h1><ProductPrice price={product.price} className="mt-4 text-2xl" /><p className="mt-6 text-lg leading-8 text-slate-600">{product.description}</p><button onClick={() => { addToCart(product.id); setAdded(true) }} className="mt-8 rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white hover:bg-indigo-700">Add to cart</button><p className="mt-3 min-h-6 text-sm font-semibold text-emerald-600">{added ? 'Added to cart successfully.' : ''}</p></div></div></section>
}
