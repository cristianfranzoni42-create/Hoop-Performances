import { Search, SlidersHorizontal, ChevronDown, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BRANDS, SIZES, COLORS } from '../constants';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = !selectedBrand || product.brand === selectedBrand;
    const matchesSize = !selectedSize || product.sizes.includes(selectedSize);
    const matchesColor = !selectedColor || product.colors.includes(selectedColor);
    return matchesSearch && matchesBrand && matchesSize && matchesColor;
  });

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-emerald-500" size={48} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-6 md:space-y-0">
        <div>
          <h1 className="text-4xl font-black tracking-tighter italic mb-2">PERFORMANCE SHOP</h1>
          <p className="text-zinc-500 text-sm">Browse our collection of elite basketball footwear.</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <input
            type="text"
            placeholder="Search shoes, brands, tech..."
            className="w-full pl-12 pr-4 py-3 bg-zinc-100 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 space-y-8">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-bold tracking-widest uppercase text-zinc-900">FILTERS</h3>
              <button
                onClick={() => {
                  setSelectedBrand(null);
                  setSelectedSize(null);
                  setSelectedColor(null);
                }}
                className="text-[10px] font-bold text-emerald-600 hover:text-emerald-700 uppercase"
              >
                Clear All
              </button>
            </div>

            {/* Brands */}
            <div className="mb-8">
              <h4 className="text-sm font-bold mb-4 italic">BRANDS</h4>
              <div className="space-y-2">
                {BRANDS.map((brand) => (
                  <label key={brand} className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="brand"
                      className="w-4 h-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500"
                      checked={selectedBrand === brand}
                      onChange={() => setSelectedBrand(brand)}
                    />
                    <span className={`text-sm ${selectedBrand === brand ? 'text-zinc-900 font-bold' : 'text-zinc-500'} group-hover:text-zinc-900 transition-colors`}>
                      {brand}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-8">
              <h4 className="text-sm font-bold mb-4 italic">SIZES (EU)</h4>
              <div className="grid grid-cols-4 gap-2">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                    className={`py-2 text-xs font-bold rounded-lg border transition-all ${
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

            {/* Colors */}
            <div className="mb-8">
              <h4 className="text-sm font-bold mb-4 italic">COLORS</h4>
              <div className="flex flex-wrap gap-2">
                {COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(selectedColor === color ? null : color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === color ? 'border-emerald-500 scale-110' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-8">
            <span className="text-sm text-zinc-500 font-medium">
              Showing <span className="text-zinc-900 font-bold">{filteredProducts.length}</span> products
            </span>
            <div className="flex items-center space-x-2 text-sm font-bold text-zinc-900 cursor-pointer">
              <span>SORT BY: NEWEST</span>
              <ChevronDown size={14} />
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-zinc-400">
                <Search size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2 italic">NO PRODUCTS FOUND</h3>
              <p className="text-zinc-500 text-sm">Try adjusting your filters or search query.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
