import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const CART_KEY = 'react-router-shop-cart'

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) ?? [] } catch { return [] }
  })

  useEffect(() => localStorage.setItem(CART_KEY, JSON.stringify(cart)), [cart])

  const addToCart = (productId) => setCart((current) => {
    const item = current.find((entry) => entry.id === productId)
    return item
      ? current.map((entry) => entry.id === productId ? { ...entry, quantity: entry.quantity + 1 } : entry)
      : [...current, { id: productId, quantity: 1 }]
  })

  const removeFromCart = (productId) => setCart((current) => current.filter((entry) => entry.id !== productId))
  const clearCart = () => setCart([])
  const count = cart.reduce((sum, item) => sum + item.quantity, 0)

  const value = useMemo(() => ({ cart, addToCart, removeFromCart, clearCart, count }), [cart, count])
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
