import { Link } from 'react-router-dom'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import ProductPrice from '../components/ProductPrice'
import { formatPrice } from '../utils'

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart()
  const items = cart.map((entry) => ({ ...entry, product: products.find((product) => product.id === entry.id) })).filter((item) => item.product)
  if (!items.length) return <section className="mx-auto max-w-4xl px-4 py-20 text-center"><div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12"><div className="text-5xl">🛒</div><h1 className="mt-4 text-3xl font-black">Your cart is empty</h1><p className="mt-3 text-slate-600">Add a product to see it here.</p><Link to="/products" className="mt-6 inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white">Browse products</Link></div></section>
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  return <section className="mx-auto max-w-4xl px-4 py-14"><p className="mb-2 text-sm font-bold uppercase tracking-[.2em] text-indigo-600">Your order</p><h1 className="mb-8 text-4xl font-black">Shopping cart</h1><div className="space-y-4">{items.map(({ product, quantity }) => <div key={product.id} className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center"><img src={product.thumbnail} alt={product.name} className="h-24 w-full rounded-xl object-cover sm:w-28" /><div className="flex-1"><Link to={`/products/${product.id}`} className="font-extrabold hover:text-indigo-600">{product.name}</Link><p className="mt-1 text-sm text-slate-500">Quantity: {quantity}</p></div><div className="sm:text-right"><ProductPrice price={product.price * quantity} /><button onClick={() => removeFromCart(product.id)} className="mt-2 text-sm font-bold text-rose-600">Remove</button></div></div>)}</div><div className="mt-6 flex flex-col justify-between gap-4 rounded-2xl bg-slate-950 p-6 text-white sm:flex-row sm:items-center"><div><p className="text-sm text-slate-400">Total</p><p className="text-2xl font-black">{formatPrice(total)}</p></div><button onClick={clearCart} className="rounded-xl bg-white px-5 py-3 font-bold text-slate-950">Clear cart</button></div></section>
}
