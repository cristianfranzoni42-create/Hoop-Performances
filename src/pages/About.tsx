import { motion } from 'motion/react';
import { History, Target, Users, Award } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://picsum.photos/seed/basketball-history/1920/1080?grayscale"
            alt="About Hero"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tighter text-white italic mb-6 uppercase"
          >
            Our <span className="text-emerald-500">Story</span>
          </motion.h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            From a local court in Brooklyn to a global performance hub. We are redefining how athletes discover their edge.
          </p>
        </div>
      </section>

      {/* History Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-black italic tracking-tighter mb-8 uppercase">The Evolution of Hoops Performance</h2>
              <div className="space-y-6 text-zinc-600 leading-relaxed">
                <p>
                  Founded in 2024, Hoops Performance started with a simple observation: the gap between professional-grade technology and the everyday hooper was too wide. Our founders, former collegiate players and sports engineers, wanted to create a platform that didn't just sell shoes, but provided the technical data needed to make informed decisions.
                </p>
                <p>
                  What began as a small review blog quickly evolved into a sophisticated performance lab. We integrated AI-driven analysis to match players with the perfect footwear based on their playing style, position, and physical needs.
                </p>
                <p>
                  Today, we serve a global community of athletes, collectors, and performance enthusiasts. Our mission remains unchanged: to provide the most authentic, high-performance basketball gear on the planet.
                </p>
              </div>
            </motion.div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img src="https://picsum.photos/seed/court1/400/600" alt="Court 1" className="rounded-2xl w-full h-64 object-cover" referrerPolicy="no-referrer" />
                <img src="https://picsum.photos/seed/court2/400/400" alt="Court 2" className="rounded-2xl w-full h-48 object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="space-y-4 pt-8">
                <img src="https://picsum.photos/seed/court3/400/400" alt="Court 3" className="rounded-2xl w-full h-48 object-cover" referrerPolicy="no-referrer" />
                <img src="https://picsum.photos/seed/court4/400/600" alt="Court 4" className="rounded-2xl w-full h-64 object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100">
              <History className="text-emerald-500 mb-6" size={32} />
              <h3 className="font-bold mb-2 italic uppercase">Heritage</h3>
              <p className="text-sm text-zinc-500">Respecting the game's history while pushing future boundaries.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100">
              <Target className="text-emerald-500 mb-6" size={32} />
              <h3 className="font-bold mb-2 italic uppercase">Precision</h3>
              <p className="text-sm text-zinc-500">Every detail matters. From traction patterns to cushion density.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100">
              <Users className="text-emerald-500 mb-6" size={32} />
              <h3 className="font-bold mb-2 italic uppercase">Community</h3>
              <p className="text-sm text-zinc-500">Built by hoopers, for hoopers. Your feedback drives our lab.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100">
              <Award className="text-emerald-500 mb-6" size={32} />
              <h3 className="font-bold mb-2 italic uppercase">Excellence</h3>
              <p className="text-sm text-zinc-500">Only the highest-rated performance gear makes our cut.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
