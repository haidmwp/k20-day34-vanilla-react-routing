import { authLayout, defaultLayout } from './layouts.js'
import { bindPageActions, cartPage, homePage, notFoundPage, productDetailPage, productsPage, signInPage, signUpPage } from './pages.js'

const app = document.querySelector('#app')

const routes = [
  { path: /^\/$/, layout: 'default', render: homePage },
  { path: /^\/products\/?$/, layout: 'default', render: productsPage },
  { path: /^\/products\/(\d+)\/?$/, layout: 'default', render: (match) => productDetailPage(match[1]) },
  { path: /^\/cart\/?$/, layout: 'default', render: cartPage },
  { path: /^\/sign-up\/?$/, layout: 'auth', render: signUpPage },
  { path: /^\/sign-in\/?$/, layout: 'auth', render: signInPage }
]

export function navigate(href) {
  if (window.location.pathname !== href) history.pushState({}, '', href)
  renderRoute(true)
}

export function renderRoute(resetScroll = true) {
  const pathname = window.location.pathname
  const route = routes.find((item) => item.path.test(pathname))
  let content
  let layout = 'default'

  if (route) {
    const match = pathname.match(route.path)
    content = route.render(match)
    layout = route.layout
  } else {
    content = notFoundPage()
  }

  app.innerHTML = layout === 'auth' ? authLayout(content, pathname) : defaultLayout(content, pathname)
  bindNavigation()
  bindPageActions(renderRoute)
  if (resetScroll) window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
}

function bindNavigation() {
  document.querySelectorAll('a[data-link]').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      event.preventDefault()
      navigate(link.getAttribute('href'))
    })
  })
}

window.addEventListener('popstate', () => renderRoute(true))
