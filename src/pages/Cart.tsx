import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Cart() {
  // Sample cart items
  const [items, setItems] = useState([
    {
      id: '1',
      name: 'LeBron 21 "Abalone"',
      brand: 'Nike',
      price: 199.99,
      size: 44,
      quantity: 1,
      image: 'https://picsum.photos/seed/lebron21/400/400'
    },
    {
      id: '2',
      name: 'KD16 "Boardroom"',
      brand: 'Nike',
      price: 159.99,
      size: 43,
      quantity: 1,
      image: 'https://picsum.photos/seed/kd16/400/400'
    }
  ]);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 15.00;
  const total = subtotal + shipping;

  const updateQuantity = (id: string, delta: number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="w-20 h-20 bg-zinc-100 rounded-3xl flex items-center justify-center mx-auto mb-8 text-zinc-400">
          <ShoppingBag size={40} />
        </div>
        <h2 className="text-3xl font-black tracking-tighter italic mb-4">YOUR CART IS EMPTY</h2>
        <p className="text-zinc-500 mb-8">Looks like you haven't added any performance gear yet.</p>
        <Link to="/shop" className="inline-flex items-center px-8 py-4 bg-zinc-900 text-white font-bold rounded-xl hover:bg-emerald-600 transition-all">
          START SHOPPING <ArrowRight size={18} className="ml-2" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-black tracking-tighter italic mb-12 uppercase">YOUR CART</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <motion.div
              layout
              key={item.id}
              className="flex items-center p-6 bg-white border border-zinc-200 rounded-2xl shadow-sm"
            >
              <div className="w-24 h-24 bg-zinc-100 rounded-xl overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="ml-6 flex-grow">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest italic">{item.brand}</span>
                    <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-tight">{item.name}</h3>
                  </div>
                  <span className="text-sm font-black text-zinc-900 italic">${item.price}</span>
                </div>
                <p className="text-xs text-zinc-500 mb-4 font-medium uppercase tracking-widest">Size: {item.size}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center border border-zinc-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1.5 hover:bg-zinc-50 text-zinc-500 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-3 text-xs font-bold text-zinc-900">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1.5 hover:bg-zinc-50 text-zinc-500 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-zinc-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-8 sticky top-24">
            <h2 className="text-xl font-black tracking-tighter italic mb-8 uppercase">ORDER SUMMARY</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500 font-medium">Subtotal</span>
                <span className="text-zinc-900 font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500 font-medium">Shipping</span>
                <span className="text-zinc-900 font-bold">${shipping.toFixed(2)}</span>
              </div>
              <div className="pt-4 border-t border-zinc-200 flex justify-between">
                <span className="text-base font-bold italic uppercase tracking-widest">Total</span>
                <span className="text-xl font-black text-zinc-900 italic">${total.toFixed(2)}</span>
              </div>
            </div>
            <Link 
              to="/checkout"
              className="w-full py-4 bg-zinc-900 text-white font-black tracking-widest uppercase rounded-xl hover:bg-emerald-600 transition-all mb-4 flex items-center justify-center"
            >
              CHECKOUT
            </Link>
            <p className="text-[10px] text-center text-zinc-400 font-medium uppercase tracking-widest">
              Taxes and shipping calculated at checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
