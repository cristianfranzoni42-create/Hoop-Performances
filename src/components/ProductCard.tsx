import { Star, ShoppingCart } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import React from 'react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group relative bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
    >
      {/* Image */}
      <Link to={`/product/${product.id}`} className="aspect-square relative overflow-hidden bg-zinc-100 block">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-zinc-900 shadow-sm">
          {product.brand}
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/product/${product.id}`}>
            <h3 className="text-sm font-semibold text-zinc-900 line-clamp-1 hover:text-emerald-600 transition-colors">{product.name}</h3>
          </Link>
          <span className="text-sm font-black text-zinc-900 italic">${product.price}</span>
        </div>

        <div className="flex items-center space-x-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} className={i < 4 ? 'fill-yellow-400 text-yellow-400' : 'fill-zinc-200 text-zinc-200'} />
          ))}
          <span className="text-[10px] font-medium text-zinc-500 ml-1">(24 reviews)</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex space-x-1">
            {product.colors.slice(0, 3).map((color, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full border border-zinc-200"
                style={{ backgroundColor: color.toLowerCase() }}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-[10px] text-zinc-400">+{product.colors.length - 3}</span>
            )}
          </div>
          <button className="p-2 bg-zinc-900 text-white rounded-xl hover:bg-emerald-600 transition-colors">
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
