import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Community from './pages/Community';
import Auth from './pages/Auth';
import AdminShoes from './pages/AdminShoes';
import About from './pages/About';
import Checkout from './pages/Checkout';
import ChatWidget from './components/ChatWidget';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/community" element={<Community />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin/shoes" element={<AdminShoes />} />
            <Route path="/about" element={<About />} />
            <Route path="/checkout" element={<Checkout />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </Router>
  );
}
