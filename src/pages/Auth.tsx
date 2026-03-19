import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Mail, Lock, User, Chrome } from 'lucide-react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-zinc-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-zinc-200 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-zinc-900 p-8 text-white text-center">
          <div className="flex justify-center items-center mb-4">
            <span className="text-2xl font-black tracking-tighter italic">HOOPS</span>
            <span className="text-2xl font-light tracking-tighter text-zinc-500 italic ml-1">PERFORMANCE</span>
          </div>
          <h2 className="text-xl font-bold italic uppercase tracking-widest">
            {isLogin ? 'Welcome Back' : 'Join the Elite'}
          </h2>
        </div>

        {/* Form */}
        <div className="p-8">
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="relative"
                >
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full pl-12 pr-4 py-3 bg-zinc-100 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all text-sm"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full pl-12 pr-4 py-3 bg-zinc-100 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all text-sm"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-12 pr-4 py-3 bg-zinc-100 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all text-sm"
              />
            </div>

            <button className="w-full py-4 bg-zinc-900 text-white font-black tracking-widest uppercase rounded-xl hover:bg-emerald-600 transition-all flex items-center justify-center group">
              {isLogin ? 'SIGN IN' : 'CREATE ACCOUNT'} <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-100"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold text-zinc-400">
                <span className="bg-white px-4">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <button className="py-4 bg-white border border-zinc-200 text-zinc-900 font-bold rounded-xl hover:bg-zinc-50 transition-all flex items-center justify-center">
                <Chrome size={18} />
              </button>
              <button className="py-4 bg-white border border-zinc-200 text-zinc-900 font-bold rounded-xl hover:bg-zinc-50 transition-all flex items-center justify-center">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </button>
              <button className="py-4 bg-white border border-zinc-200 text-zinc-900 font-bold rounded-xl hover:bg-zinc-50 transition-all flex items-center justify-center">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.057 12.781c.032 2.588 2.246 3.469 2.271 3.484-.02.062-.354 1.212-1.174 2.411-.709 1.037-1.441 2.069-2.603 2.091-1.139.02-1.507-.673-2.813-.673-1.304 0-1.711.653-2.791.694-1.122.041-1.968-1.102-2.683-2.137-1.462-2.115-2.576-5.976-1.066-8.592.75-1.298 2.085-2.122 3.534-2.142 1.102-.02 2.143.743 2.813.743.671 0 1.933-.919 3.233-.786 1.302.133 2.302.603 2.949 1.551-2.642 1.59-2.215 5.169.44 6.256zm-2.404-9.319c.583-.706.974-1.69.866-2.675-.845.034-1.869.563-2.475 1.27-.544.629-.919 1.63-.804 2.596.941.073 1.874-.539 2.413-1.191z"/></svg>
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-xs font-bold text-zinc-500 hover:text-emerald-600 uppercase tracking-widest transition-colors"
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
