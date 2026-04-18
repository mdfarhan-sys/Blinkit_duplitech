import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import CartDrawer from './components/CartDrawer'
import DeliveryWidget from './components/DeliveryWidget'
import Footer from './components/Footer'
import LoginModal from './components/LoginModal'
import { CartProvider } from './context/CartContext'
import { LocationProvider } from './context/LocationContext'
import { AuthProvider } from './context/AuthContext'
import { Toaster } from 'react-hot-toast'

import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Router>
      <AuthProvider>
      <LocationProvider>
      <CartProvider>
        <div className="min-h-screen bg-[#F5F7F9] font-sans pb-20 md:pb-0">
          <Toaster position="bottom-center" toastOptions={{ duration: 2000 }} />
          <LoginModal />
          <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <DeliveryWidget />
          <CartDrawer />
        
          <Routes>
            <Route path="/" element={<Home searchTerm={searchTerm} />} />
            <Route path="/:categoryId" element={<CategoryPage searchTerm={searchTerm} />} />
          </Routes>

          <Footer />
        </div>
      </CartProvider>
      </LocationProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
