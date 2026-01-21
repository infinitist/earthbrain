
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RECOMMENDED_BOOKS } from '../constants';

const Philosophy: React.FC = () => {
  const [activeTab, setActiveTab] = useState('identity');
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tabsRef.current) {
      // Calculate position to scroll to: 
      // Element top minus the navbar height (approx 74px)
      const elementPosition = tabsRef.current.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - 74;

      // Only scroll if we are already scrolled past the hero or if it's a tab change
      // The user specifically wants to "go to the top of the menu"
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, [activeTab]);

  const tabs = [
    { id: 'identity', label: 'Connection', subtitle: 'Nature & Self', icon: '🌍' },
    { id: 'critique', label: 'Sharing', subtitle: 'Breaking Silos', icon: '⚖️' },
    { id: 'biology', label: 'Health', subtitle: 'Vitality', icon: '💧' },
    { id: 'mysticism', label: 'Service', subtitle: 'Honest Action', icon: '🤝' },
    { id: 'solidarity', label: 'Simplicity', subtitle: 'Visual Fast', icon: '🖼️' },
    { id: 'library', label: 'Bookshelf', subtitle: 'Her Favorites', icon: '📚' },
  ];

  const imageAnimation = {
    initial: { opacity: 0, scale: 0.95, y: 30 },
    whileInView: { opacity: 1, scale: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  } as const;

  // Tab Image Mapping as requested
  const tabImages: Record<string, string> = {
    identity: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
    critique: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=80',
    biology: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
    mysticism: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&q=80',
    solidarity: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&q=80',
    library: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
  };

  const ImageWithLoader = ({ src, alt, className }: { src: string, alt: string, className?: string }) => (
    <div className={`relative bg-emerald-100 overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover relative z-10"
        loading="lazy"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-emerald-50 z-0">
        <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      {/* Immersive Header */}
      <section className="relative h-[50vh] flex items-center justify-center bg-emerald-950 overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 3 }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2560"
            className="w-full h-full object-cover"
            alt="Ancient Forest Canopy"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/80 via-emerald-950/40 to-white/0" />

        <div className="relative z-10 text-center px-6 mt-12 max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <span className="text-amber-500 font-black uppercase tracking-[0.8em] text-[10px] block mb-6">Insights & Teachings</span>
            <h1 className="font-serif text-5xl md:text-7xl text-white mb-4 tracking-tighter leading-none italic">A Sincere Path</h1>
            <p className="font-serif italic text-lg md:text-2xl text-emerald-100 max-w-2xl mx-auto leading-relaxed opacity-90">
              "To look honestly at the world is to find your own place within it."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div
        ref={tabsRef}
        className="sticky top-[70px] z-[45] bg-white border-y border-emerald-100 shadow-sm overflow-x-auto no-scrollbar"
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center py-6 min-w-[900px] lg:min-w-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center group px-6 py-4 rounded-[2rem] transition-all duration-500 relative ${activeTab === tab.id ? 'bg-emerald-950 scale-105 shadow-xl' : 'hover:bg-emerald-50'
                  }`}
              >
                <span className={`text-3xl mb-3 transition-all ${activeTab === tab.id ? 'opacity-100' : 'opacity-30 grayscale group-hover:grayscale-0 group-hover:opacity-100'}`}>
                  {tab.icon}
                </span>
                <span className={`text-[10px] font-black uppercase tracking-[0.3em] mb-0.5 ${activeTab === tab.id ? 'text-amber-400' : 'text-slate-400 group-hover:text-emerald-900'}`}>
                  {tab.label}
                </span>
                <span className={`text-[7px] font-bold uppercase tracking-[0.2em] ${activeTab === tab.id ? 'text-emerald-300' : 'text-slate-300'}`}>
                  {tab.subtitle}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="container mx-auto px-6 py-16 lg:py-24 max-w-4xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            {/* 1. IDENTITY */}
            {activeTab === 'identity' && (
              <article className="space-y-12">
                <div className="max-w-4xl">
                  <h2 className="font-serif text-3xl md:text-4xl text-emerald-950 mb-8 tracking-tight italic">Reconnecting with the Natural World</h2>
                  <div className="prose prose-emerald prose-lg text-slate-600 font-light leading-relaxed space-y-8">
                    <p>
                      Krystina often spoke about how modern life makes us feel separate from the world around us. She called this a "hallucination"—a trick of the mind that makes us forget we are part of a much larger, living system.
                    </p>

                    <motion.div {...imageAnimation} className="my-16">
                      <ImageWithLoader
                        src={tabImages.identity}
                        alt="Deep Forest Identity"
                        className="rounded-[3rem] shadow-2xl h-[32rem] w-full"
                      />
                      <p className="text-[10px] uppercase tracking-widest text-slate-400 mt-6 text-center italic">The forest canopy: Representing the collective neural net of the Earth.</p>
                    </motion.div>

                    <p>
                      In her view, we aren't just "visiting" nature; we are nature. Our thoughts, our health, and our choices are all part of how the world functions. When we start to see ourselves this way, we begin to live with more purpose and less fear.
                    </p>

                    <p>
                      Every breath is a reminder of this connection. Every drop of water we drink has been part of the earth's cycles for eons. Reclaiming this perspective is the first step toward a more honest and grounded life.
                    </p>

                    <blockquote className="font-serif italic text-2xl text-emerald-900 border-l-4 border-amber-500 pl-10 py-8 bg-emerald-50 rounded-r-[2.5rem] my-12">
                      "We aren't separate from the world; we are the world's way of noticing itself."
                    </blockquote>
                  </div>
                </div>
              </article>
            )}

            {/* 2. CRITIQUE */}
            {activeTab === 'critique' && (
              <article className="space-y-12">
                <div className="max-w-4xl">
                  <h2 className="font-serif text-3xl md:text-4xl text-emerald-950 mb-8 tracking-tight italic">Breaking Silos & The Value of Sharing</h2>
                  <div className="prose prose-emerald prose-lg text-slate-600 font-light leading-relaxed space-y-8">
                    <p>
                      Krystina looked deeply at how we organize our lives and our resources. She noticed that whenever we "store" things away—whether it's food, money, or even ideas—we start to build silos that separate us from one another.
                    </p>

                    <motion.div {...imageAnimation} className="my-16">
                      <ImageWithLoader
                        src={tabImages.critique}
                        alt="Sunlight piercing through constraints"
                        className="rounded-[3rem] shadow-2xl h-[32rem] w-full"
                      />
                      <p className="text-[10px] uppercase tracking-widest text-slate-400 mt-6 text-center italic">The critique of artificial storage: Returning to the flow of light.</p>
                    </motion.div>

                    <p>
                      When we hoard, we create hierarchies and prisons of our own making. Her vision was for a world where we return to a "flow" of resources—where sharing is the natural state, and we treat our community like a single, healthy body.
                    </p>

                    <div className="bg-emerald-950 text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden my-16 border border-emerald-900">
                      <p className="font-serif italic text-2xl leading-relaxed opacity-90">
                        "The silo is a mindset that keeps us from seeing the abundance right in front of us. When we let go of the need to own, we find the freedom to live."
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* 3. BIOLOGY */}
            {activeTab === 'biology' && (
              <article className="space-y-12">
                <div className="max-w-4xl">
                  <h2 className="font-serif text-3xl md:text-4xl text-emerald-950 mb-8 tracking-tight italic">Common-Sense Health & Vitality</h2>
                  <div className="prose prose-emerald prose-lg text-slate-600 font-light leading-relaxed space-y-8">
                    <p>
                      As a nurse, Krystina understood that our health is the foundation of our independence. She believed that when we take care of our bodies, we take back our power to think clearly and act sincerely.
                    </p>

                    <motion.div {...imageAnimation} className="my-16">
                      <ImageWithLoader
                        src={tabImages.biology}
                        alt="Misty Landscape and Water"
                        className="rounded-[3rem] shadow-2xl h-[32rem] w-full"
                      />
                      <p className="text-[10px] uppercase tracking-widest text-slate-400 mt-6 text-center italic">Mist and Water: The medium through which the Earth's biology communicates.</p>
                    </motion.div>

                    <p>
                      <strong>The 3L Practice:</strong> Drinking 3 liters of water daily *before* eating is a simple way to clear the "fuzziness" of modern life. It’s not about rules; it’s about giving your body the clarity it needs to find joy in everyday moments.
                    </p>

                    <p>
                      When you feel well, you are harder to manipulate. A hydrated, honest body is naturally resilient. It’s a foundational step in reclaiming your focus and your health.
                    </p>

                    <div className="bg-emerald-50 p-12 rounded-[3rem] border border-emerald-100 my-16 shadow-sm">
                      <p className="text-slate-700 italic text-xl leading-relaxed">"Health is the most honest conversation you can have with yourself. Hydration is where that conversation begins."</p>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* 4. MYSTICISM */}
            {activeTab === 'mysticism' && (
              <article className="space-y-12">
                <div className="max-w-4xl">
                  <h2 className="font-serif text-3xl md:text-4xl text-emerald-950 mb-8 tracking-tight italic">Service & Honest Action</h2>
                  <div className="prose prose-emerald prose-lg text-slate-600 font-light leading-relaxed space-y-8">
                    <p>
                      Krystina drew inspiration from many cultures, particularly her time in India. She admired the concept of a "Warrior for Peace"—someone who is willing to stand up and serve those who have no voice, whether they are animals, forests, or communities in need.
                    </p>

                    <motion.div {...imageAnimation} className="my-16">
                      <ImageWithLoader
                        src={tabImages.mysticism}
                        alt="Ancient Oak Tree"
                        className="rounded-[3rem] shadow-2xl h-[32rem] w-full"
                      />
                      <p className="text-[10px] uppercase tracking-widest text-slate-400 mt-6 text-center italic">The Ancient Oak: A symbol of the steadfastness required of the Earth's immune response.</p>
                    </motion.div>

                    <p>
                      Service isn't about being a hero; it's about being useful. A true activist doesn't fight for a cause; they show up for the "Silent Ones." To serve is to be the hands and eyes of a community that cares for all life.
                    </p>

                    <blockquote className="font-serif italic text-2xl text-amber-600 border-l-4 border-emerald-900 pl-10 py-8 my-16 bg-slate-50 rounded-r-3xl">
                      "We stand up because we can. We speak because they can't. Service is how we prove we are listening to the world."
                    </blockquote>
                  </div>
                </div>
              </article>
            )}

            {/* 5. SOLIDARITY */}
            {activeTab === 'solidarity' && (
              <article className="space-y-12">
                <div className="max-w-4xl">
                  <h2 className="font-serif text-3xl md:text-4xl text-emerald-950 mb-8 tracking-tight italic">Simplicity in a Loud World</h2>
                  <div className="prose prose-emerald prose-lg text-slate-600 font-light leading-relaxed space-y-8">
                    <p>
                      We live in a world that is constantly screaming for our attention with bright colors and loud distractions. Krystina believed that this "noise" keeps us from seeing the simple, honest truths right in front of us.
                    </p>

                    <motion.div {...imageAnimation} className="my-16">
                      <ImageWithLoader
                        src={tabImages.solidarity}
                        alt="Structure of an Ancient Tree"
                        className="rounded-[3rem] shadow-2xl h-[32rem] w-full grayscale"
                      />
                      <p className="text-[10px] uppercase tracking-widest text-slate-400 mt-6 text-center italic">The Binary of Truth: Stripping away 'visual sugar' to see the structural integrity of life.</p>
                    </motion.div>

                    <p>
                      By choosing simplicity—whether it's through a "visual fast" or just turning down the volume of modern media—we return our attention to what matters. It's about seeing the structure of life clearly, without the "sugar" that usually clouds our vision.
                    </p>

                    <div className="flex flex-col items-center py-16 bg-emerald-950 rounded-[4rem] border border-emerald-900 my-16 shadow-2xl">
                      <div className="flex gap-10 mb-12">
                        <div className="w-20 h-20 bg-white border-2 border-slate-300 rounded-full shadow-2xl animate-pulse" />
                        <div className="w-20 h-20 bg-black rounded-full shadow-2xl" />
                      </div>
                      <p className="font-black uppercase tracking-[0.6em] text-[12px] text-amber-500">#BlackAndWhiteWillUnite</p>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* 6. LIBRARY */}
            {activeTab === 'library' && (
              <article className="space-y-12">
                <div className="text-center mb-16">
                  <h2 className="font-serif text-4xl text-emerald-950 mb-6 tracking-tight italic">Books She Loved</h2>
                  <p className="text-xl text-slate-500 font-serif italic max-w-2xl mx-auto leading-relaxed">"She always said that the right book at the right time is like a conversation with a friend you haven't met yet."</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {RECOMMENDED_BOOKS.map((book) => (
                    <motion.div
                      key={book.title}
                      whileHover={{ y: -10 }}
                      className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all flex flex-col h-full group"
                    >
                      <div className="flex justify-between items-start mb-10">
                        <span className="bg-emerald-50 text-emerald-700 px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest">{book.category}</span>
                        <span className="text-amber-500 text-3xl group-hover:rotate-12 transition-transform duration-500">📜</span>
                      </div>
                      <h3 className="font-serif text-2xl text-emerald-950 mb-4 leading-tight">{book.title}</h3>
                      <p className="text-emerald-800 font-black text-[10px] uppercase tracking-[0.3em] mb-6">{book.author}</p>
                      <p className="text-slate-500 text-sm leading-relaxed font-light flex-grow italic">"{book.description}"</p>
                    </motion.div>
                  ))}
                </div>

                <motion.div {...imageAnimation} className="mt-24">
                  <ImageWithLoader
                    src={tabImages.library}
                    alt="Her Library"
                    className="rounded-[3rem] shadow-2xl h-[32rem] w-full brightness-75"
                  />
                  <div className="bg-emerald-900 text-white p-12 rounded-b-[3rem] -mt-6 relative z-10 border-x border-b border-emerald-800 shadow-2xl">
                    <p className="font-serif italic text-2xl leading-relaxed text-center">"Truth isn't found in a search engine; it's found when you slow down enough to listen to the people who came before us."</p>
                  </div>
                </motion.div>
              </article>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Legacy Footer */}
      <section className="py-32 px-6 text-center bg-white border-t border-emerald-50">
        <div className="container mx-auto max-w-3xl">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1.5 }}>
            <span className="text-amber-500 text-8xl font-serif mb-[-2rem] block opacity-20">“</span>
            <blockquote className="font-serif text-3xl md:text-5xl text-emerald-950 italic mb-12 leading-snug tracking-tight">
              "We've spent too much time thinking we're separate. It's time to realize we're all in this together, for the good of everyone."
            </blockquote>
            <p className="font-black uppercase tracking-[0.6em] text-[12px] text-amber-600 mb-2">— Krystina P.</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-300">Activist & Friend</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Philosophy;
