import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Plus, Loader2, Sparkles, Check } from 'lucide-react';
import { BRANDS } from '../constants';
import { useSearchParams } from 'react-router-dom';

export default function AdminShoes() {
  const [searchParams] = useSearchParams();
  const [selectedBrand, setSelectedBrand] = useState(BRANDS[0]);
  const [customPrompt, setCustomPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [addingId, setAddingId] = useState<string | null>(null);
  const [isAddingAll, setIsAddingAll] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const prompt = searchParams.get('prompt');
    if (prompt) {
      setCustomPrompt(prompt);
      // We need to wait for the state to update or just pass it directly
      generateShoes(prompt);
    }
  }, [searchParams]);

  const generateShoes = async (overridePrompt?: string) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const response = await fetch('/api/generate-shoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          brand: selectedBrand, 
          customPrompt: overridePrompt || customPrompt 
        })
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to generate shoes');
      }
      
      const data = await response.json();
      const shoes = data.shoes || data.results || (Array.isArray(data) ? data : []);
      // Add a temporary local ID for UI tracking
      const shoesWithIds = shoes.map((s: any, i: number) => ({ ...s, tempId: `temp-${i}` }));
      setResults(shoesWithIds);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addToCatalog = async (shoe: any) => {
    setAddingId(shoe.tempId);
    setError(null);
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(shoe)
      });

      if (!response.ok) throw new Error('Failed to add shoe to catalog');

      setSuccessMessage(`${shoe.name} added to catalog successfully!`);
      // Remove from results after adding
      setResults(prev => prev.filter(s => s.tempId !== shoe.tempId));
      
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setAddingId(null);
    }
  };

  const addAllToCatalog = async () => {
    if (results.length === 0) return;
    setIsAddingAll(true);
    setError(null);
    try {
      const promises = results.map(shoe => 
        fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(shoe)
        })
      );
      
      const responses = await Promise.all(promises);
      const failed = responses.filter(r => !r.ok);
      
      if (failed.length > 0) {
        throw new Error(`Failed to add ${failed.length} shoes to catalog`);
      }

      setSuccessMessage(`All ${results.length} shoes added to catalog successfully!`);
      setResults([]);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsAddingAll(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-black tracking-tighter italic mb-2 uppercase">GROQ SHOE FINDER</h1>
        <p className="text-zinc-500 text-sm">Use AI to find the latest performance gear for your catalog.</p>
      </div>

      {successMessage && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-24 right-8 z-50 bg-emerald-500 text-white px-6 py-4 rounded-2xl shadow-xl flex items-center font-bold italic uppercase tracking-widest text-xs"
        >
          <Check className="mr-2" size={18} />
          {successMessage}
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-8 bg-zinc-900 text-white rounded-3xl">
            <h3 className="text-xs font-bold tracking-widest uppercase text-zinc-500 mb-6 italic">SELECT BRAND</h3>
            <div className="space-y-2 mb-8">
              {BRANDS.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    selectedBrand === brand 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>

            <h3 className="text-xs font-bold tracking-widest uppercase text-zinc-500 mb-4 italic">CUSTOM REQUEST (OPTIONAL)</h3>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="e.g. Find shoes for outdoor courts or specific colorways..."
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 mb-8 min-h-[100px] resize-none"
            />

            <button
              onClick={generateShoes}
              disabled={loading}
              className="w-full py-4 bg-white text-zinc-900 font-black tracking-widest uppercase rounded-xl hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : <Sparkles className="mr-2" size={18} />}
              GENERATE SUGGESTIONS
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-xs font-bold uppercase tracking-widest">
              {error}
              <p className="mt-2 text-[10px] font-medium normal-case">Make sure GROQ_API_KEY is set in your environment.</p>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="lg:col-span-2">
          {results.length > 0 ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-black italic uppercase tracking-tighter">AI SUGGESTIONS</h2>
                <button
                  onClick={addAllToCatalog}
                  disabled={isAddingAll}
                  className="px-6 py-3 bg-emerald-500 text-white text-xs font-bold rounded-xl hover:bg-emerald-600 transition-all flex items-center disabled:opacity-50 shadow-lg shadow-emerald-500/20"
                >
                  {isAddingAll ? (
                    <Loader2 className="animate-spin mr-2" size={14} />
                  ) : (
                    <Plus size={14} className="mr-2" />
                  )}
                  ADD ALL TO CATALOG
                </button>
              </div>
              {results.map((shoe, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={idx}
                  className="p-8 bg-white border border-zinc-200 rounded-3xl shadow-sm"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest italic">{shoe.brand}</span>
                      <h3 className="text-xl font-black italic uppercase tracking-tighter">{shoe.name}</h3>
                    </div>
                    <span className="text-lg font-black text-zinc-900 italic">${shoe.price}</span>
                  </div>
                  <p className="text-sm text-zinc-500 mb-6 leading-relaxed">{shoe.description}</p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {Object.entries(shoe.techSpecs || {}).map(([key, val]: [string, any]) => (
                      <div key={key} className="p-3 bg-zinc-50 rounded-xl">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">{key}</span>
                        <p className="text-[10px] font-bold text-zinc-900 leading-tight">{val}</p>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => addToCatalog(shoe)}
                    disabled={addingId === shoe.tempId}
                    className="px-6 py-3 bg-zinc-900 text-white text-xs font-bold rounded-xl hover:bg-emerald-600 transition-all flex items-center disabled:opacity-50"
                  >
                    {addingId === shoe.tempId ? (
                      <Loader2 className="animate-spin mr-2" size={14} />
                    ) : (
                      <Plus size={14} className="mr-2" />
                    )}
                    ADD TO CATALOG
                  </button>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-zinc-50 rounded-3xl border border-dashed border-zinc-200 text-center p-12">
              <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center mb-6 text-zinc-300">
                <Search size={32} />
              </div>
              <h3 className="text-xl font-black italic mb-2 uppercase">No Suggestions Yet</h3>
              <p className="text-sm text-zinc-500 max-w-xs">Select a brand and click generate to find the best performance gear using Groq AI.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
