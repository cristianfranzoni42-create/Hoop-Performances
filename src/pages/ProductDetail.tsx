import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Shield, Truck, RotateCcw, ChevronRight, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      const found = data.find((p: Product) => p.id === id);
      setProduct(found || null);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-emerald-500" size={48} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
        <h2 className="text-2xl font-black italic uppercase mb-4">Product Not Found</h2>
        <Link to="/shop" className="text-emerald-600 font-bold hover:underline">BACK TO SHOP</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs font-bold text-zinc-400 uppercase tracking-widest mb-12">
        <a href="/" className="hover:text-zinc-900 transition-colors">HOME</a>
        <ChevronRight size={12} />
        <a href="/shop" className="hover:text-zinc-900 transition-colors">SHOP</a>
        <ChevronRight size={12} />
        <span className="text-zinc-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-zinc-100 rounded-3xl overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square bg-zinc-100 rounded-2xl overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                <img
                  src={`https://picsum.photos/seed/shoe-${i}/400/400`}
                  alt={`Gallery ${i}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="mb-8">
            <span className="text-emerald-600 font-black tracking-widest uppercase text-xs mb-2 block italic">{product.brand}</span>
            <h1 className="text-4xl font-black tracking-tighter italic mb-4">{product.name}</h1>
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-black text-zinc-900 italic">${product.price}</span>
              <div className="flex items-center space-x-1 border-l border-zinc-200 pl-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < 4 ? 'fill-yellow-400 text-yellow-400' : 'fill-zinc-200 text-zinc-200'} />
                ))}
                <span className="text-xs font-bold text-zinc-500 ml-1">4.8 (24 REVIEWS)</span>
              </div>
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold italic uppercase tracking-widest">SELECT SIZE (EU)</h3>
              <button className="text-xs font-bold text-emerald-600 hover:underline">SIZE GUIDE</button>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 text-sm font-bold rounded-xl border transition-all ${
                    selectedSize === size
                      ? 'bg-zinc-900 border-zinc-900 text-white'
                      : 'bg-white border-zinc-200 text-zinc-600 hover:border-zinc-900'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col space-y-4 mb-12">
            <button className="w-full py-5 bg-zinc-900 text-white font-black tracking-widest uppercase rounded-2xl hover:bg-emerald-600 transition-all flex items-center justify-center group">
              <ShoppingCart size={20} className="mr-3" /> ADD TO CART
            </button>
            <button className="w-full py-5 border-2 border-zinc-900 text-zinc-900 font-black tracking-widest uppercase rounded-2xl hover:bg-zinc-900 hover:text-white transition-all">
              BUY IT NOW
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 py-8 border-y border-zinc-100 mb-12">
            <div className="flex flex-col items-center text-center">
              <Truck size={20} className="text-zinc-400 mb-2" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Fast Shipping</span>
            </div>
            <div className="flex flex-col items-center text-center border-x border-zinc-100">
              <Shield size={20} className="text-zinc-400 mb-2" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Authentic</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <RotateCcw size={20} className="text-zinc-400 mb-2" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">30-Day Returns</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="space-y-6">
            <div className="flex space-x-8 border-b border-zinc-100">
              {['description', 'specs', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all relative ${
                    activeTab === tab ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-600'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />
                  )}
                </button>
              ))}
            </div>

            <div className="text-sm text-zinc-500 leading-relaxed min-h-[100px]">
              {activeTab === 'description' && (
                <p>{product.description}</p>
              )}
              {activeTab === 'specs' && (
                <ul className="space-y-4">
                  <li><strong className="text-zinc-900 uppercase tracking-widest text-[10px]">Grip:</strong> {product.techSpecs.grip}</li>
                  <li><strong className="text-zinc-900 uppercase tracking-widest text-[10px]">Cushion:</strong> {product.techSpecs.cushion}</li>
                  <li><strong className="text-zinc-900 uppercase tracking-widest text-[10px]">Support:</strong> {product.techSpecs.support}</li>
                </ul>
              )}
              {activeTab === 'reviews' && (
                <p>Community reviews coming soon. Join the conversation!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
