import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { VIDEOS } from '../constants';
import { VideoItem } from '../types';

const VideoCard: React.FC<{ video: VideoItem }> = ({ video }) => {
  const [showTranscript, setShowTranscript] = useState(false);
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
      <div className="bg-white rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-500">
        {/* Large Cinematic Thumbnail */}
        <div className="relative aspect-[16/10] bg-emerald-950 overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}`}
            title={video.title}
            className="w-full h-full object-cover brightness-90 group-hover:scale-110 group-hover:brightness-100 transition-all duration-700"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Overlay elements */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-transparent to-transparent pointer-events-none"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
            <svg className="w-10 h-10 text-emerald-950 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        <div className="absolute top-6 left-6">
          <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium">
            {video.category}
          </span>
        </div>

        {/* Content Area */}
        <div className="p-10 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="font-serif text-3xl text-emerald-950 leading-tight mb-6 group-hover:text-emerald-800 transition-colors">
              {video.title}
            </h3>
            <p className="text-slate-500 text-sm font-light leading-relaxed mb-8 line-clamp-3 italic">
              {video.transcript ? `"${video.transcript.substring(0, 120)}..."` : "Explore the archived teachings..."}
            </p>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-slate-50">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-900/40 flex items-center gap-3">
              <div className="text-amber-500 group-hover:translate-x-2 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </div>
              Watch on YouTube
            </span>
            {video.transcript && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowTranscript(!showTranscript);
                }}
                className="text-xs font-medium text-emerald-700 hover:text-emerald-900 px-4 py-2 rounded-full border border-emerald-200 hover:border-emerald-400 transition-all"
              >
                {showTranscript ? 'Hide Transcript' : 'Study Transcript'}
              </button>
            )}
          </div>

          {showTranscript && video.transcript && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 p-6 bg-emerald-50 rounded-2xl border border-emerald-100"
            >
              <h4 className="font-semibold text-emerald-900 mb-3">Full Transcript:</h4>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{video.transcript}</p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.a>
  );
};

const Archive: React.FC = () => {
  const [activeCategory, setActiveCategory] = React.useState('All');
  const categories = ['All', 'Philosophy', 'Legacy', 'Healing', 'Transformation'];

  const filteredVideos = activeCategory === 'All'
    ? VIDEOS
    : VIDEOS.filter(video => video.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-6xl text-emerald-950 mb-6">Video Archive</h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Explore Krystina's teachings and insights on biocentric consciousness, healing, and our connection to the Earth.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-emerald-900 text-white'
                  : 'bg-white text-slate-700 hover:bg-emerald-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video, index) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Archive;