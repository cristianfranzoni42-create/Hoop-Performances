import { MessageSquare, Star, ThumbsUp, Plus, Search } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';

export default function Community() {
  const [activeTab, setActiveTab] = useState<'reviews' | 'lab' | 'events'>('reviews');

  const reviews = [
    {
      id: '1',
      user: 'Marcus G.',
      product: 'LeBron 21',
      rating: 5,
      comment: 'The cushion on these is insane. Best LeBron model in years for guards who need impact protection.',
      likes: 12,
      time: '2 hours ago'
    },
    {
      id: '2',
      user: 'Elena R.',
      product: 'Curry 11',
      rating: 4,
      comment: 'Traction is elite as always with Flow, but the lateral support could be a bit stiffer for heavy cutters.',
      likes: 8,
      time: '5 hours ago'
    },
    {
      id: '3',
      user: 'David K.',
      product: 'KD16',
      rating: 5,
      comment: 'Perfect all-around shoe. Great for wings. The Zoom Air feels very responsive.',
      likes: 15,
      time: '1 day ago'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-6 md:space-y-0">
        <div>
          <h1 className="text-4xl font-black tracking-tighter italic mb-2 uppercase">PERFORMANCE COMMUNITY</h1>
          <p className="text-zinc-500 text-sm">Connect with elite players and sneakerheads.</p>
        </div>
        <button className="px-6 py-3 bg-zinc-900 text-white font-bold rounded-xl hover:bg-emerald-600 transition-all flex items-center justify-center">
          <Plus size={18} className="mr-2" /> CREATE POST
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-8 border-b border-zinc-100 mb-12">
        {['reviews', 'lab', 'events'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all relative ${
              activeTab === tab ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-600'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div layoutId="communityTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-8">
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {reviews.map((review) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={review.id}
                  className="p-6 bg-white border border-zinc-200 rounded-2xl shadow-sm"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-400">
                        <MessageSquare size={20} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-zinc-900">{review.user}</h4>
                        <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest">{review.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-zinc-200 text-zinc-200'} />
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest italic mb-1 block">REVIEW: {review.product}</span>
                    <p className="text-sm text-zinc-600 leading-relaxed">{review.comment}</p>
                  </div>
                  <div className="flex items-center space-x-4 pt-4 border-t border-zinc-50">
                    <button className="flex items-center space-x-1 text-xs font-bold text-zinc-400 hover:text-emerald-600 transition-colors">
                      <ThumbsUp size={14} />
                      <span>{review.likes} LIKES</span>
                    </button>
                    <button className="flex items-center space-x-1 text-xs font-bold text-zinc-400 hover:text-zinc-900 transition-colors">
                      <MessageSquare size={14} />
                      <span>REPLY</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'lab' && (
            <div className="py-24 text-center bg-zinc-50 rounded-3xl border border-dashed border-zinc-200">
              <h3 className="text-xl font-black italic mb-2 uppercase">Performance Lab</h3>
              <p className="text-sm text-zinc-500">Deep dives into shoe tech and performance testing coming soon.</p>
            </div>
          )}

          {activeTab === 'events' && (
            <div className="py-24 text-center bg-zinc-50 rounded-3xl border border-dashed border-zinc-200">
              <h3 className="text-xl font-black italic mb-2 uppercase">Upcoming Events</h3>
              <p className="text-sm text-zinc-500">Local meetups and demo days will be listed here.</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          {/* Trending Topics */}
          <div className="p-8 bg-zinc-950 text-white rounded-3xl">
            <h3 className="text-xs font-bold tracking-widest uppercase text-zinc-500 mb-6 italic">TRENDING TOPICS</h3>
            <ul className="space-y-4">
              <li className="flex justify-between items-center group cursor-pointer">
                <span className="text-sm font-bold group-hover:text-emerald-500 transition-colors">#LeBron21Tech</span>
                <span className="text-xs text-zinc-500">1.2k posts</span>
              </li>
              <li className="flex justify-between items-center group cursor-pointer">
                <span className="text-sm font-bold group-hover:text-emerald-500 transition-colors">#OutdoorHoops</span>
                <span className="text-xs text-zinc-500">850 posts</span>
              </li>
              <li className="flex justify-between items-center group cursor-pointer">
                <span className="text-sm font-bold group-hover:text-emerald-500 transition-colors">#Curry11Grip</span>
                <span className="text-xs text-zinc-500">640 posts</span>
              </li>
              <li className="flex justify-between items-center group cursor-pointer">
                <span className="text-sm font-bold group-hover:text-emerald-500 transition-colors">#BestForGuards</span>
                <span className="text-xs text-zinc-500">2.1k posts</span>
              </li>
            </ul>
          </div>

          {/* Top Contributors */}
          <div className="p-8 bg-white border border-zinc-200 rounded-3xl">
            <h3 className="text-xs font-bold tracking-widest uppercase text-zinc-500 mb-6 italic">TOP CONTRIBUTORS</h3>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-zinc-100 rounded-full" />
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900">User_{i}23</h4>
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Elite Reviewer</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
