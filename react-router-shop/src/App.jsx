import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import { CartProvider } from './context/CartContext'
import DefaultLayout from './layouts/DefaultLayout'
import AuthLayout from './layouts/AuthLayout'
import HomePage from './pages/HomePage'
import ProductListPage from './pages/ProductListPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return <BrowserRouter><CartProvider><ScrollToTop /><Routes>
    <Route element={<DefaultLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductListPage />} />
      <Route path="/products/:productId" element={<ProductDetailPage />} />
      <Route path="/cart" element={<CartPage />} />
    </Route>
    <Route element={<AuthLayout />}>
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/sign-in" element={<SignInPage />} />
    </Route>
    <Route path="/not-found" element={<NotFoundPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes></CartProvider></BrowserRouter>
}
