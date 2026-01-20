
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RECOMMENDED_BOOKS } from '../constants';

const Philosophy: React.FC = () => {
  const [activeTab, setActiveTab] = useState('identity');

  const tabs = [
    { id: 'identity', label: 'Identity', subtitle: 'Biocentric Self', icon: '🌍' },
    { id: 'critique', label: 'Systems', subtitle: 'The Silo Trap', icon: '⛓️' },
    { id: 'biology', label: 'Sovereignty', subtitle: 'Metabolic', icon: '💧' },
    { id: 'mysticism', label: 'Immune', subtitle: 'The Khalsa', icon: '⚔️' },
    { id: 'solidarity', label: 'The Vote', subtitle: 'Visual Fast', icon: '⚖️' },
    { id: 'library', label: 'Archive', subtitle: 'Sacred Texts', icon: '📚' },
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
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/80 via-emerald-950/20 to-white" />
        
        <div className="relative z-10 text-center px-6 mt-12 max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <span className="text-amber-500 font-black uppercase tracking-[0.8em] text-[10px] block mb-6">The Master Repository</span>
            <h1 className="font-serif text-5xl md:text-7xl text-white mb-4 tracking-tighter leading-none italic">The Visionary Path</h1>
            <p className="font-serif italic text-lg md:text-2xl text-emerald-100 max-w-2xl mx-auto leading-relaxed opacity-90">
              "To return to the source is to find the Earth thinking through you."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="sticky top-[70px] z-[45] bg-white border-y border-emerald-100 shadow-sm overflow-x-auto no-scrollbar">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center py-6 min-w-[900px] lg:min-w-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center group px-6 py-4 rounded-[2rem] transition-all duration-500 relative ${
                  activeTab === tab.id ? 'bg-emerald-950 scale-105 shadow-xl' : 'hover:bg-emerald-50'
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
                  <h2 className="font-serif text-3xl md:text-4xl text-emerald-950 mb-8 tracking-tight italic">Beyond the Skin-Boundary Hallucination</h2>
                  <div className="prose prose-emerald prose-lg text-slate-600 font-light leading-relaxed space-y-8">
                    <p>
                      Krystina’s work began with a radical reframing of human identity: the <strong>"Skin-Boundary Hallucination."</strong> She observed that modern humans suffer from a form of planetary dysmorphia, where we view ourselves as autonomous actors independent of the biosphere. 
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
                      In the <strong>Our Earth Brain</strong> paradigm, the human brain is not a private terminal for personal data. Instead, it is a specialized organ of the Earth itself—a pre-frontal cortex that allows the planet to witness, reflect upon, and navigate its own evolution. 
                    </p>
                    
                    <p>
                      Every human mind provides value only when it acknowledges its role as a sensor for the biosphere. This shift is biological. Every breath you take is an atmospheric exchange; every drop of water in your blood has cycled through the oceans and clouds for eons.
                    </p>

                    <blockquote className="font-serif italic text-2xl text-emerald-900 border-l-4 border-amber-500 pl-10 py-8 bg-emerald-50 rounded-r-[2.5rem] my-12">
                      "We are not guests on this planet; we are the planet’s way of saying 'I AM'."
                    </blockquote>
                  </div>
                </div>
              </article>
            )}

            {/* 2. CRITIQUE */}
            {activeTab === 'critique' && (
              <article className="space-y-12">
                <div className="max-w-4xl">
                  <h2 className="font-serif text-3xl md:text-4xl text-emerald-950 mb-8 tracking-tight italic">The Stored Grain Fallacy & The Bio-Lobotomy</h2>
                  <div className="prose prose-emerald prose-lg text-slate-600 font-light leading-relaxed space-y-8">
                    <p>
                      Krystina identified a historical turning point: the transition from <strong>"Flow" to "Storage."</strong> For the vast majority of human existence, we lived in accordance with Natural Law, moving with the cycles of light and life.
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
                      The moment grain was stored in a Silo, a hierarchy was born. Stored grain required protection, which birthed the first specialized guards. Currencies required legitimacy, which birthed monarchs. We have been shackled to a "Monoculture of the Mind," where we are forced to think in rows.
                    </p>
                    
                    <p>
                      To break the shackle, we must dismantle the Silo-mentality. We must realize that hoarding is a biological cancer, and that true security comes from the "Flow" of resources through a healthy, shared planetary body.
                    </p>

                    <div className="bg-emerald-950 text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden my-16 border border-emerald-900">
                       <p className="font-serif italic text-2xl leading-relaxed opacity-90">
                         "The Silo is the architecture of the first prison. Its purpose is to keep the Earth's nutrients from those who need them most."
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
                  <h2 className="font-serif text-3xl md:text-4xl text-emerald-950 mb-8 tracking-tight italic">Metabolic Sovereignty & The pH of Rebellion</h2>
                  <div className="prose prose-emerald prose-lg text-slate-600 font-light leading-relaxed space-y-8">
                    <p>
                      Krystina’s teachings on health were about political sovereignty. She argued that <strong>a dehydrated, acidic population is a compliant population.</strong> The State controls us not just through ideology, but through our metabolic chemistry.
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
                      <strong>The 3L Protocol:</strong> Drinking 3 liters of structured water daily *before* any food intake is a foundational act of metabolic rebellion. This flushes out the "Psychic Sludge" of industrial life and returns the internal oceans to an alkaline state of Joy.
                    </p>
                    
                    <p>
                      Joy is the only frequency that can naturally resist systemic manipulation. If you are hydrated and alkaline, fear cannot find a home in your tissues. We wake clear, hydrated, and ready to act as a sovereign node in the Earth Brain.
                    </p>

                    <div className="bg-emerald-50 p-12 rounded-[3rem] border border-emerald-100 my-16 shadow-sm">
                       <p className="text-slate-700 italic text-xl leading-relaxed">"A body at 7.4 pH is a mind that cannot be owned. Hydration is the first step toward reclaiming your soul."</p>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* 4. MYSTICISM */}
            {activeTab === 'mysticism' && (
              <article className="space-y-12">
                <div className="max-w-4xl">
                  <h2 className="font-serif text-3xl md:text-4xl text-emerald-950 mb-8 tracking-tight italic">The Global Khalsa: The Earth's Immune Response</h2>
                  <div className="prose prose-emerald prose-lg text-slate-600 font-light leading-relaxed space-y-8">
                    <p>
                      Krystina viewed the Sikh archetype of the <strong>Khalsa</strong> through the lens of evolutionary biology. She described the Khalsa as the Earth's "White Blood Cells"—an immune response birthed by the biosphere herself to combat the cancer of systemic greed.
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
                      The core of this mission is <strong>Ek Onkar</strong>: the realization that the universe is a singular, vibrating field of Unity. A true planetary warrior does not fight for a nation-state; they fight for the "Silent Ones"—the animals, the forests, and the water tables that have no voice.
                    </p>
                    
                    <p>
                      The Khalsa’s <strong>"Sword of Mercy"</strong> is the decisive action required to prune away the parasitic systems that are suffocating the planet. To be a warrior-saint is to be the Earth's hands and eyes in the physical realm.
                    </p>

                    <blockquote className="font-serif italic text-2xl text-amber-600 border-l-4 border-emerald-900 pl-10 py-8 my-16 bg-slate-50 rounded-r-3xl">
                      "We fight not for land or gold, but for the breath of the world. We are the shield for the voiceless billions."
                    </blockquote>
                  </div>
                </div>
              </article>
            )}

            {/* 5. SOLIDARITY */}
            {activeTab === 'solidarity' && (
              <article className="space-y-12">
                <div className="max-w-4xl">
                  <h2 className="font-serif text-3xl md:text-4xl text-emerald-950 mb-8 tracking-tight italic">The Visual Fast & The Global Vote</h2>
                  <div className="prose prose-emerald prose-lg text-slate-600 font-light leading-relaxed space-y-8">
                    <p>
                      Modern corporate media uses <strong>"Visual Sugar"</strong>—hyper-saturated colors designed to trigger dopamine and bypass logic. This keeps the Earth Brain in a state of superficial agitation, preventing us from seeing structural truth.
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
                      The <strong>Black & White movement</strong> is a "Visual Renunciation." By choosing monochrome, we return our attention to structure and geometry. Every image shared in Black and White is a <strong>Global Vote</strong>—a signal of solidarity that transcends language.
                    </p>
                    
                    <p>
                      When we unite under the banner of monochrome, we signal our return to the root of all things, refusing to be distracted by the "sugar" of the system. It is a spiritual filter for a new era of clarity.
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
                  <h2 className="font-serif text-4xl text-emerald-950 mb-6 tracking-tight italic">The Earth Archive</h2>
                  <p className="text-xl text-slate-500 font-serif italic max-w-2xl mx-auto leading-relaxed">"These maps were drawn by those who remembered the way home when the rest of the world was lost in the Silos."</p>
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
                    alt="The Living Archive" 
                    className="rounded-[3rem] shadow-2xl h-[32rem] w-full brightness-75"
                   />
                   <div className="bg-emerald-900 text-white p-12 rounded-b-[3rem] -mt-6 relative z-10 border-x border-b border-emerald-800 shadow-2xl">
                      <p className="font-serif italic text-2xl leading-relaxed text-center">"Wisdom is not found in the storage of data, but in the flow of understanding through the living nervous system of the world."</p>
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
              "The Earth can no longer handle the separation. It is time to join our minds and hearts for the good of the whole."
            </blockquote>
            <p className="font-black uppercase tracking-[0.6em] text-[12px] text-amber-600 mb-2">— Krystina Poludnikiewicz</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-300">Movement Founder & Biocentric Visionary</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Philosophy;
