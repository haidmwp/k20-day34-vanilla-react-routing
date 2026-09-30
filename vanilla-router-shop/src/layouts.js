import { getCartCount } from './store.js'

const navItems = [
  { href: '/', label: 'Home', match: (path) => path === '/' },
  { href: '/products', label: 'Products', match: (path) => path === '/products' || path.startsWith('/products/') },
  { href: '/cart', label: 'Cart', match: (path) => path === '/cart' },
  { href: '/sign-in', label: 'Sign In', match: (path) => path === '/sign-in' },
  { href: '/sign-up', label: 'Sign Up', match: (path) => path === '/sign-up' }
]

function header(pathname) {
  const nav = navItems.map(({ href, label, match }) => {
    const active = match(pathname)
    const classes = active
      ? 'bg-indigo-600 text-white'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'

    return `<a data-link href="${href}" class="rounded-lg px-3 py-2 text-sm font-semibold transition ${classes}">${label}${label === 'Cart' ? ` <span class="ml-1 rounded-full bg-white/20 px-1.5 py-0.5 text-xs">${getCartCount()}</span>` : ''}</a>`
  }).join('')

  return `
    <header class="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div class="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <a data-link href="/" class="text-xl font-black tracking-tight text-indigo-600">RouteShop</a>
        <nav class="flex flex-wrap gap-1">${nav}</nav>
      </div>
    </header>`
}

function footer() {
  return `<footer class="border-t border-slate-200 bg-white"><div class="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-500">Day 34 Routing Practice · Vanilla JavaScript + Tailwind CSS</div></footer>`
}

export function defaultLayout(content, pathname) {
  return `${header(pathname)}<main class="min-h-[calc(100vh-160px)]">${content}</main>${footer()}`
}

export function authLayout(content, pathname) {
  const signInClass = pathname === '/sign-in' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-white'
  const signUpClass = pathname === '/sign-up' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-white'
  return `
    <main class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50 px-4 py-10">
      <div class="mx-auto mb-8 flex max-w-md items-center justify-between"><a data-link href="/" class="text-xl font-black text-indigo-600">RouteShop</a><nav class="flex gap-1"><a data-link href="/sign-in" class="rounded-lg px-3 py-2 text-sm font-bold transition ${signInClass}">Sign In</a><a data-link href="/sign-up" class="rounded-lg px-3 py-2 text-sm font-bold transition ${signUpClass}">Sign Up</a></nav></div>
      <div class="mx-auto max-w-md">${content}</div>
    </main>`
}
