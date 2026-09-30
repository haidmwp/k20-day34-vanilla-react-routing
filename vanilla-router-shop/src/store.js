const CART_KEY = 'vanilla-router-shop-cart'

export function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) ?? []
  } catch {
    return []
  }
}

export function addToCart(productId) {
  const cart = getCart()
  const existing = cart.find((item) => item.id === productId)

  if (existing) existing.quantity += 1
  else cart.push({ id: productId, quantity: 1 })

  localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

export function removeFromCart(productId) {
  const cart = getCart().filter((item) => item.id !== productId)
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

export function clearCart() {
  localStorage.setItem(CART_KEY, JSON.stringify([]))
}

export function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0)
}
