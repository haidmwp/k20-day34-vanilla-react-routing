import { formatPrice } from '../utils'
export default function ProductPrice({ price, className = '' }) {
  return <p className={`font-black text-indigo-600 ${className}`}>{formatPrice(price)}</p>
}
