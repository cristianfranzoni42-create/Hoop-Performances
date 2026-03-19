import { ArrowRight, Zap, Shield, Globe, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data.slice(0, 3)); // Just show first 3 on home
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://picsum.photos/seed/basketball-court/1920/1080?blur=4"
            alt="Hero Background"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="text-emerald-500 font-bold tracking-widest uppercase text-xs mb-4 block">NEW SEASON DROP</span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white italic mb-6 leading-none">
              ELEVATE YOUR <br /> <span className="text-emerald-500">PERFORMANCE</span>
            </h1>
            <p className="text-lg text-zinc-300 mb-8 leading-relaxed">
              Engineered for the elite. Discover the next generation of basketball footwear designed for maximum grip, cushion, and support.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/shop" className="px-8 py-4 bg-white text-zinc-950 font-bold rounded-xl hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center group">
                SHOP NOW <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/community" className="px-8 py-4 bg-zinc-900 text-white font-bold rounded-xl border border-zinc-800 hover:bg-zinc-800 transition-all text-center">
                JOIN COMMUNITY
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center mb-6 text-emerald-600">
                <Zap size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 italic">ELITE PERFORMANCE</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Every shoe is tested for top-tier grip, impact protection, and lateral stability.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center mb-6 text-emerald-600">
                <Shield size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 italic">AUTHENTICITY GUARANTEED</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                100% genuine products sourced directly from official brands and verified partners.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center mb-6 text-emerald-600">
                <Globe size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 italic">GLOBAL COMMUNITY</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Join thousands of hoopers sharing reviews, performance tips, and sneaker insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-black tracking-tighter italic mb-2">FEATURED DROPS</h2>
              <p className="text-zinc-500 text-sm">The latest and greatest in performance footwear.</p>
            </div>
            <Link to="/shop" className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors flex items-center">
              VIEW ALL <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full flex justify-center py-12">
                <Loader2 className="animate-spin text-emerald-500" size={32} />
              </div>
            ) : products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="col-span-full text-center text-zinc-500">No products available.</p>
            )}
          </div>
        </div>
      </section>

      {/* Community CTA */}
      <section className="py-24 bg-emerald-600 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <img
            src="https://picsum.photos/seed/community/800/800"
            alt="Community"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-xl">
            <h2 className="text-4xl font-black tracking-tighter text-white italic mb-6">BECOME A MEMBER</h2>
            <p className="text-emerald-100 mb-8 leading-relaxed">
              Unlock exclusive drops, member-only discounts, and join the conversation in our performance lab.
            </p>
            <button className="px-8 py-4 bg-white text-emerald-600 font-bold rounded-xl hover:bg-zinc-950 hover:text-white transition-all">
              SIGN UP FOR FREE
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
