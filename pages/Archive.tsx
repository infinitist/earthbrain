
import React from 'react';
import { motion } from 'framer-motion';
import { VIDEOS } from '../constants';
import { VideoItem } from '../types';

const VideoCard: React.FC<{ video: VideoItem }> = ({ video }) => {
  const youtubeUrl = `https://www.youtube.com/watch?v=${video.youtubeId}`;

  return (
    <motion.a
      href={youtubeUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -12 }}
      className="group block"
    >
      <div className="bg-white rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 border border-slate-100 flex flex-col h-full">
        {/* Large Cinematic Thumbnail */}
        <div className="relative aspect-[16/10] bg-emerald-950 overflow-hidden">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover brightness-90 group-hover:scale-110 group-hover:brightness-100 transition-all duration-1000"
          />

          {/* Overlay elements */}
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center shadow-2xl transform scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500">
              <svg className="w-10 h-10 text-emerald-950 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          <div className="absolute top-6 left-6">
            <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">
              {video.category}
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-10 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="font-serif text-3xl text-emerald-950 leading-tight mb-6 group-hover:text-amber-600 transition-colors">
              {video.title}
            </h3>
            <p className="text-slate-500 text-sm font-light leading-relaxed mb-8 line-clamp-3 italic">
              {video.transcript ? `"${video.transcript.substring(0, 120)}..."` : "Explore the archives of the Our Earth Brain movement."}
            </p>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-slate-50">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-900/40">Watch on YouTube</span>
            <div className="text-amber-500 group-hover:translate-x-2 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </motion.a>
  );
};

const Archive: React.FC = () => {
  const [activeCategory, setActiveCategory] = React.useState('All');
  const categories = ['All', 'Philosophy', 'Legacy', 'Healing', 'Transformation'];

  const filtered = activeCategory === 'All'
    ? VIDEOS
    : VIDEOS.filter(v => v.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Immersive Library Header */}
      <header className="pt-64 pb-20 px-6 bg-slate-50 border-b border-emerald-100 text-center">
        <div className="container mx-auto max-w-6xl">
          <div className="opacity-100">
            <span className="text-amber-500 font-black uppercase tracking-[0.5em] text-[10px] block mb-6">Master Resource Center</span>
            <h1 className="font-serif text-6xl md:text-9xl text-emerald-950 mb-8 tracking-tighter leading-none italic">The Archive</h1>
            <p className="font-serif italic text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed opacity-80">
              "We preserve her words as a living frequency, vibrating through the collective mind of the planet."
            </p>
          </div>

          {/* Category Filter */}
          <div className="mt-20 flex flex-wrap justify-center gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-10 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-500 shadow-sm ${activeCategory === cat
                  ? 'bg-emerald-950 text-amber-400 shadow-2xl scale-105'
                  : 'bg-white text-slate-400 hover:text-emerald-900 hover:bg-emerald-50'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Video Grid */}
      <section className="py-24 px-6 container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filtered.map(v => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-40">
            <p className="font-serif text-3xl text-slate-400 italic">This wing of the archive is still being digitized.</p>
          </div>
        )}
      </section>

      {/* Call to Unity */}
      <section className="py-32 bg-emerald-950 text-white text-center overflow-hidden relative">
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="font-serif text-4xl md:text-6xl mb-8 italic">Continue the Journey</h2>
          <p className="text-amber-500 font-black uppercase tracking-[0.5em] text-[12px] mb-12">Visit @OurEarthBrain on YouTube for the full visual experience</p>
          <a
            href="https://www.youtube.com/@OurEarthBrain/videos"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-emerald-950 px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-amber-500 transition-all shadow-2xl inline-block"
          >
            Open Channel
          </a>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,100 C30,80 70,80 100,100" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <path d="M0,90 C30,70 70,70 100,90" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <path d="M0,80 C30,60 70,60 100,80" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>
      </section>
    </div>
  );
};

export default Archive;
