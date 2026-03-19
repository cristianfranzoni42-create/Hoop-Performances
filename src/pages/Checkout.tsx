import { motion } from 'motion/react';
import { CreditCard, ShieldCheck, Truck, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Checkout() {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="flex justify-between mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-200 -translate-y-1/2 z-0"></div>
          {[1, 2, 3].map((s) => (
            <div 
              key={s}
              className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                step >= s ? 'bg-emerald-500 text-white' : 'bg-white text-zinc-400 border border-zinc-200'
              }`}
            >
              {step > s ? <CheckCircle2 size={20} /> : s}
            </div>
          ))}
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl shadow-xl border border-zinc-200 overflow-hidden"
        >
          {step === 1 && (
            <div className="p-8">
              <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-8">Shipping Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <input type="text" placeholder="First Name" className="w-full px-4 py-3 bg-zinc-100 rounded-xl text-sm" />
                <input type="text" placeholder="Last Name" className="w-full px-4 py-3 bg-zinc-100 rounded-xl text-sm" />
                <input type="email" placeholder="Email Address" className="w-full px-4 py-3 bg-zinc-100 rounded-xl text-sm md:col-span-2" />
                <input type="text" placeholder="Address" className="w-full px-4 py-3 bg-zinc-100 rounded-xl text-sm md:col-span-2" />
                <input type="text" placeholder="City" className="w-full px-4 py-3 bg-zinc-100 rounded-xl text-sm" />
                <input type="text" placeholder="Postal Code" className="w-full px-4 py-3 bg-zinc-100 rounded-xl text-sm" />
              </div>
              <button 
                onClick={() => setStep(2)}
                className="w-full py-4 bg-zinc-900 text-white font-black tracking-widest uppercase rounded-xl hover:bg-emerald-600 transition-all flex items-center justify-center"
              >
                CONTINUE TO PAYMENT <Truck size={18} className="ml-2" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="p-8">
              <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-8">Payment Method</h2>
              <div className="space-y-4 mb-8">
                <div className="p-6 border-2 border-emerald-500 bg-emerald-50 rounded-2xl flex items-center">
                  <CreditCard className="text-emerald-600 mr-4" size={24} />
                  <div className="flex-grow">
                    <p className="font-bold text-sm">Credit or Debit Card</p>
                    <p className="text-xs text-zinc-500">Secure payment via Stripe</p>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                </div>
              </div>
              <div className="space-y-4 mb-8">
                <input type="text" placeholder="Card Number" className="w-full px-4 py-3 bg-zinc-100 rounded-xl text-sm" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 bg-zinc-100 rounded-xl text-sm" />
                  <input type="text" placeholder="CVC" className="w-full px-4 py-3 bg-zinc-100 rounded-xl text-sm" />
                </div>
              </div>
              <div className="flex items-center text-zinc-500 text-xs mb-8">
                <ShieldCheck size={16} className="mr-2" />
                Your payment information is encrypted and secure.
              </div>
              <button 
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full py-4 bg-zinc-900 text-white font-black tracking-widest uppercase rounded-xl hover:bg-emerald-600 transition-all flex items-center justify-center disabled:opacity-50"
              >
                {isProcessing ? 'PROCESSING...' : 'PAY NOW'}
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="p-12 text-center">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 size={48} />
              </div>
              <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-4">Order Confirmed!</h2>
              <p className="text-zinc-500 mb-8 max-w-xs mx-auto">
                Thank you for your purchase. Your elite performance gear is being prepared for shipment.
              </p>
              <Link 
                to="/shop"
                className="inline-block px-8 py-4 bg-zinc-900 text-white font-black tracking-widest uppercase rounded-xl hover:bg-emerald-600 transition-all"
              >
                BACK TO SHOP
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
