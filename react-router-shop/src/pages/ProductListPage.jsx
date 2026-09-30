import ProductCard from '../components/ProductCard'
import { products } from '../data/products'
export default function ProductListPage() {
  return <section className="mx-auto max-w-6xl px-4 py-14"><p className="mb-2 text-sm font-bold uppercase tracking-[.2em] text-indigo-600">Catalog</p><h1 className="text-4xl font-black">All products</h1><p className="mt-3 max-w-2xl text-slate-600">Scroll down, then navigate to another page to verify that ScrollToTop resets the page position.</p><div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div></section>
}
