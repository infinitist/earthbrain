
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2560" 
            className="w-full h-full object-cover brightness-50"
            alt="Forest Canopy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/40 via-transparent to-slate-50" />
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="font-serif text-5xl md:text-8xl text-white mb-6 drop-shadow-2xl">
              Our Earth Brain
            </h1>
            <p className="font-serif italic text-xl md:text-3xl text-amber-100 max-w-3xl mx-auto mb-10 opacity-90 leading-relaxed">
              "Honoring the visionary life and movement founded by Krystina Poludnikiewicz."
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link 
                to="/memorial" 
                className="bg-amber-500 hover:bg-amber-600 text-emerald-950 px-10 py-4 rounded-full font-bold uppercase tracking-widest transition-all w-full sm:w-auto"
              >
                The Memorial
              </Link>
              <Link 
                to="/philosophy" 
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-10 py-4 rounded-full font-bold uppercase tracking-widest transition-all w-full sm:w-auto"
              >
                Our Philosophy
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Preview */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
              <div className="relative">
                <img 
                  src="https://www.sharingmemoriesadmin.ca/img/1093723" 
                  className="rounded-2xl shadow-2xl relative z-10"
                  alt="Krystina in Nature"
                />
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-amber-200/50 rounded-full blur-3xl z-0" />
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-emerald-200/50 rounded-full blur-3xl z-0" />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="font-serif text-4xl md:text-5xl text-emerald-950 mb-8 leading-tight">
                A Visionary for the <span className="italic text-amber-700">Sentient Earth</span>
              </h2>
              <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
                <p>
                  Krystina Poludnikiewicz founded Our Earth Brain with a singular, profound realization: that we are not observers of nature, but the organ through which the Earth reflects upon itself.
                </p>
                <p>
                  Her work transcended traditional environmentalism, moving into the realm of biocentric consciousness. She believed that by listening to the "whispers" of the land, we could heal our fractured relationship with the biosphere.
                </p>
                <p>
                  Today, we carry forward her legacy by nurturing the seeds she planted—advocacy, education, and a deep, spiritual reverence for all living systems.
                </p>
              </div>
              <div className="mt-10">
                <Link to="/philosophy" className="inline-flex items-center text-emerald-900 font-bold uppercase tracking-widest text-sm hover:translate-x-2 transition-transform">
                  Explore the Philosophy 
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quotes Section */}
      <section className="bg-emerald-950 py-24 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 opacity-10">
           <svg className="w-96 h-96" viewBox="0 0 200 200" fill="currentColor"><path d="M40,100 Q40,40 100,40 Q160,40 160,100 Q160,160 100,160 Q40,160 40,100" /></svg>
        </div>
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-amber-400 text-6xl font-serif">"</span>
            <blockquote className="font-serif text-3xl md:text-5xl italic mb-8 max-w-4xl mx-auto leading-tight">
              The Earth does not belong to us; we belong to the Earth. Our thoughts are her neurons. Our actions are her heartbeat.
            </blockquote>
            <cite className="font-bold uppercase tracking-[0.3em] text-sm text-amber-500 block">— Krystina Poludnikiewicz</cite>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
