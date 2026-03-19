import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-6">
              <span className="text-2xl font-black tracking-tighter italic">HOOPS</span>
              <span className="text-2xl font-light tracking-tighter text-zinc-500 italic ml-1">PERFORMANCE</span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed mb-6">
              The ultimate destination for performance basketball footwear and community insights.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-zinc-900 rounded-full hover:bg-emerald-600 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 bg-zinc-900 rounded-full hover:bg-emerald-600 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 bg-zinc-900 rounded-full hover:bg-emerald-600 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 bg-zinc-900 rounded-full hover:bg-emerald-600 transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-zinc-500 mb-6">SHOP</h4>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li><Link to="/shop" className="hover:text-white transition-colors">All Shoes</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Nike</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Jordan</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Adidas</a></li>
              <li><a href="#" className="hover:text-white transition-colors">New Releases</a></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-zinc-500 mb-6">COMMUNITY</h4>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li><Link to="/community" className="hover:text-white transition-colors">Reviews</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Performance Lab</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Events</a></li>
              <li><Link to="/admin/shoes" className="text-emerald-500 font-bold hover:text-emerald-400 transition-colors">Shoe Finder (AI)</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-zinc-500 mb-6">SUPPORT</h4>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-zinc-500">
            © 2026 HOOPS PERFORMANCE. ALL RIGHTS RESERVED.
          </p>
          <div className="flex space-x-6 text-xs text-zinc-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
