import { Link } from 'react-router-dom'
import ProductPrice from './ProductPrice'

export default function ProductCard({ product }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/products/${product.id}`}><img src={product.thumbnail} alt={product.name} className="h-56 w-full object-cover" /></Link>
      <div className="p-5">
        <h2 className="text-lg font-extrabold text-slate-950"><Link to={`/products/${product.id}`} className="hover:text-indigo-600">{product.name}</Link></h2>
        <ProductPrice price={product.price} className="mt-2" />
        <p className="mt-3 text-sm leading-6 text-slate-600">{product.description}</p>
        <Link to={`/products/${product.id}`} className="mt-5 inline-flex font-bold text-slate-900 hover:text-indigo-600">View details →</Link>
      </div>
    </article>
  )
}
