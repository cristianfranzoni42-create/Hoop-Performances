import React, { useState } from 'react';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/admin/shoes?prompt=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-black tracking-tighter text-zinc-900 italic">HOOPS</span>
            <span className="text-2xl font-light tracking-tighter text-zinc-500 italic ml-1">PERFORMANCE</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/shop" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">SHOP</Link>
            <Link to="/community" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">COMMUNITY</Link>
            <Link to="/about" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">ABOUT</Link>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-5">
            <div className="relative flex items-center">
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.form
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 200, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    onSubmit={handleSearchSubmit}
                    className="absolute right-full mr-2"
                  >
                    <input
                      type="text"
                      placeholder="Search and create..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-1.5 bg-zinc-100 border-none rounded-full text-sm focus:ring-2 focus:ring-emerald-500 transition-all"
                      autoFocus
                    />
                  </motion.form>
                )}
              </AnimatePresence>
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-zinc-600 hover:text-zinc-900 transition-colors"
              >
                {isSearchOpen ? <X size={20} /> : <Search size={20} />}
              </button>
            </div>
            <Link to="/cart" className="p-2 text-zinc-600 hover:text-zinc-900 transition-colors relative">
              <ShoppingCart size={20} />
              <span className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">2</span>
            </Link>
            <Link to="/auth" className="p-2 text-zinc-600 hover:text-zinc-900 transition-colors">
              <User size={20} />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-zinc-200 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              <a href="/" className="block px-3 py-2 text-base font-medium text-zinc-900">SHOP</a>
              <a href="/community" className="block px-3 py-2 text-base font-medium text-zinc-900">COMMUNITY</a>
              <a href="/about" className="block px-3 py-2 text-base font-medium text-zinc-900">ABOUT</a>
              <div className="flex items-center space-x-4 pt-4 px-3">
                <button className="p-2 text-zinc-600"><Search size={20} /></button>
                <button className="p-2 text-zinc-600"><ShoppingCart size={20} /></button>
                <button className="p-2 text-zinc-600"><User size={20} /></button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
