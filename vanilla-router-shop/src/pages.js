import { products } from './products.js'
import { formatPrice } from './utils.js'
import { addToCart, clearCart, getCart, removeFromCart } from './store.js'

const sectionTitle = (eyebrow, title, copy = '') => `
  <div class="mb-8">
    <p class="mb-2 text-sm font-bold uppercase tracking-[.2em] text-indigo-600">${eyebrow}</p>
    <h1 class="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">${title}</h1>
    ${copy ? `<p class="mt-3 max-w-2xl text-slate-600">${copy}</p>` : ''}
  </div>`

export function homePage() {
  const featured = products.slice(0, 3).map(productCard).join('')
  return `
    <section class="bg-slate-950 px-4 py-20 text-white sm:py-28">
      <div class="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        <div>
          <p class="mb-4 text-sm font-bold uppercase tracking-[.25em] text-indigo-300">Simple shopping, better essentials</p>
          <h1 class="text-4xl font-black tracking-tight sm:text-6xl">A tiny shop built to practice real routing.</h1>
          <p class="mt-6 max-w-xl text-lg text-slate-300">Browse useful everyday products, open dynamic detail routes and keep your cart while navigating without full-page reloads.</p>
          <div class="mt-8 flex flex-wrap gap-3">
            <a data-link href="/products" class="rounded-xl bg-indigo-500 px-5 py-3 font-bold transition hover:bg-indigo-400">Shop products</a>
            <a data-link href="/sign-up" class="rounded-xl border border-white/20 px-5 py-3 font-bold transition hover:bg-white/10">Create account</a>
          </div>
        </div>
        <img src="${products[0].thumbnail}" alt="${products[0].name}" class="h-80 w-full rounded-3xl object-cover shadow-2xl" />
      </div>
    </section>
    <section class="mx-auto max-w-6xl px-4 py-16">
      ${sectionTitle('Featured', 'Popular picks', 'A few sample products from the catalog.')}
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">${featured}</div>
    </section>`
}

export function productCard(product) {
  return `
    <article class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <a data-link href="/products/${product.id}" class="block"><img src="${product.thumbnail}" alt="${product.name}" class="h-56 w-full object-cover" /></a>
      <div class="p-5">
        <h2 class="text-lg font-extrabold text-slate-950"><a data-link href="/products/${product.id}" class="hover:text-indigo-600">${product.name}</a></h2>
        <p class="mt-2 font-bold text-indigo-600">${formatPrice(product.price)}</p>
        <p class="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">${product.description}</p>
        <a data-link href="/products/${product.id}" class="mt-5 inline-flex font-bold text-slate-900 hover:text-indigo-600">View details →</a>
      </div>
    </article>`
}

export function productsPage() {
  return `<section class="mx-auto max-w-6xl px-4 py-14">${sectionTitle('Catalog', 'All products', 'Scroll down, then navigate to another page to verify that scroll resets to the top.')}<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">${products.map(productCard).join('')}</div></section>`
}

export function productDetailPage(id) {
  const product = products.find((item) => item.id === Number(id))
  if (!product) return notFoundPage('Product not found', 'The product ID in this URL does not exist.')

  return `
    <section class="mx-auto max-w-6xl px-4 py-14">
      <a data-link href="/products" class="mb-8 inline-flex font-semibold text-slate-500 hover:text-indigo-600">← Back to products</a>
      <div class="grid gap-10 lg:grid-cols-2">
        <img src="${product.thumbnail}" alt="${product.name}" class="h-[420px] w-full rounded-3xl object-cover shadow-sm" />
        <div class="self-center">
          <span class="rounded-full bg-indigo-50 px-3 py-1 text-sm font-bold text-indigo-700">Product #${product.id}</span>
          <h1 class="mt-5 text-4xl font-black tracking-tight text-slate-950">${product.name}</h1>
          <p class="mt-4 text-2xl font-black text-indigo-600">${formatPrice(product.price)}</p>
          <p class="mt-6 text-lg leading-8 text-slate-600">${product.description}</p>
          <button data-add-cart="${product.id}" class="mt-8 rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white transition hover:bg-indigo-700">Add to cart</button>
          <p id="cart-feedback" class="mt-3 min-h-6 text-sm font-semibold text-emerald-600"></p>
        </div>
      </div>
    </section>`
}

export function cartPage() {
  const cart = getCart()
  const items = cart.map((entry) => {
    const product = products.find((item) => item.id === entry.id)
    if (!product) return ''
    return `
      <div class="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center">
        <img src="${product.thumbnail}" alt="${product.name}" class="h-24 w-full rounded-xl object-cover sm:w-28" />
        <div class="flex-1"><a data-link href="/products/${product.id}" class="font-extrabold text-slate-950 hover:text-indigo-600">${product.name}</a><p class="mt-1 text-sm text-slate-500">Quantity: ${entry.quantity}</p></div>
        <div class="sm:text-right"><p class="font-black text-indigo-600">${formatPrice(product.price * entry.quantity)}</p><button data-remove-cart="${product.id}" class="mt-2 text-sm font-bold text-rose-600 hover:text-rose-700">Remove</button></div>
      </div>`
  }).join('')

  if (!cart.length) {
    return `<section class="mx-auto max-w-4xl px-4 py-20 text-center"><div class="rounded-3xl border border-dashed border-slate-300 bg-white p-12"><div class="text-5xl">🛒</div><h1 class="mt-4 text-3xl font-black">Your cart is empty</h1><p class="mt-3 text-slate-600">Add a product to see it here.</p><a data-link href="/products" class="mt-6 inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white">Browse products</a></div></section>`
  }

  const total = cart.reduce((sum, entry) => {
    const product = products.find((item) => item.id === entry.id)
    return sum + (product ? product.price * entry.quantity : 0)
  }, 0)

  return `<section class="mx-auto max-w-4xl px-4 py-14">${sectionTitle('Your order', 'Shopping cart')}<div class="space-y-4">${items}</div><div class="mt-6 flex flex-col justify-between gap-4 rounded-2xl bg-slate-950 p-6 text-white sm:flex-row sm:items-center"><div><p class="text-sm text-slate-400">Total</p><p class="text-2xl font-black">${formatPrice(total)}</p></div><button data-clear-cart class="rounded-xl bg-white px-5 py-3 font-bold text-slate-950 hover:bg-slate-100">Clear cart</button></div></section>`
}

function authForm(type) {
  const isSignUp = type === 'sign-up'
  return `
    <div class="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/50 sm:p-9">
      <p class="text-sm font-bold uppercase tracking-[.2em] text-indigo-600">${isSignUp ? 'Join us' : 'Welcome back'}</p>
      <h1 class="mt-2 text-3xl font-black">${isSignUp ? 'Create your account' : 'Sign in to RouteShop'}</h1>
      <p class="mt-2 text-sm text-slate-500">This demo validates required fields only. No real authentication is performed.</p>
      <form data-auth-form class="mt-7 space-y-5">
        ${isSignUp ? `<label class="block text-sm font-bold">Full name<input name="name" required class="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" placeholder="Your name" /></label>` : ''}
        <label class="block text-sm font-bold">Email<input name="email" type="email" required class="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" placeholder="you@example.com" /></label>
        <label class="block text-sm font-bold">Password<input name="password" type="password" minlength="6" required class="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" placeholder="Minimum 6 characters" /></label>
        <button class="w-full rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white hover:bg-indigo-700">${isSignUp ? 'Create account' : 'Sign in'}</button>
        <p id="auth-feedback" class="min-h-6 text-center text-sm font-semibold text-emerald-600"></p>
      </form>
      <p class="mt-3 text-center text-sm text-slate-500">${isSignUp ? 'Already have an account?' : 'New to RouteShop?'} <a data-link class="font-bold text-indigo-600" href="/${isSignUp ? 'sign-in' : 'sign-up'}">${isSignUp ? 'Sign in' : 'Sign up'}</a></p>
    </div>`
}

export const signInPage = () => authForm('sign-in')
export const signUpPage = () => authForm('sign-up')

export function notFoundPage(title = 'Page not found', message = 'The page you requested does not exist or may have moved.') {
  return `<section class="mx-auto flex min-h-[70vh] max-w-4xl items-center justify-center px-4 py-16 text-center"><div><p class="text-8xl font-black text-indigo-100">404</p><h1 class="mt-2 text-4xl font-black text-slate-950">${title}</h1><p class="mx-auto mt-4 max-w-lg text-slate-600">${message}</p><div class="mt-7 flex justify-center gap-3"><a data-link href="/" class="rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white">Go home</a><a data-link href="/products" class="rounded-xl border border-slate-300 bg-white px-5 py-3 font-bold">Products</a></div></div></section>`
}

export function bindPageActions(rerender) {
  document.querySelectorAll('[data-add-cart]').forEach((button) => button.addEventListener('click', () => {
    addToCart(Number(button.dataset.addCart))
    const feedback = document.querySelector('#cart-feedback')
    if (feedback) feedback.textContent = 'Added to cart successfully.'
  }))

  document.querySelectorAll('[data-remove-cart]').forEach((button) => button.addEventListener('click', () => {
    removeFromCart(Number(button.dataset.removeCart))
    rerender(false)
  }))

  document.querySelector('[data-clear-cart]')?.addEventListener('click', () => {
    clearCart()
    rerender(false)
  })

  document.querySelector('[data-auth-form]')?.addEventListener('submit', (event) => {
    event.preventDefault()
    if (!event.currentTarget.reportValidity()) return
    document.querySelector('#auth-feedback').textContent = 'Form validated successfully.'
  })
}
