import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import krystinaHero from '../src/krystina-hero.jpg';
import krystinaMission from '../src/krystina-mission.jpg';

const Home: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  // Fade out image & zoom out anchor to bottom.
  // Slower fade: range extended from 0.4 to 0.8
  const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scaleHero = useTransform(scrollYProgress, [0, 0.8], [1, 0.9]);

  return (
    <div className="relative overflow-x-hidden">
      {/* Parallax Hero Section */}
      <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-64 pb-20">

        {/* Parallax Background */}
        <motion.div
          style={{ y: yBg }}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2560"
            className="w-full h-[120%] object-cover brightness-50" // taller height for parallax
            alt="Forest Canopy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/60 via-emerald-900/20 to-slate-50" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full">
          <div>
            <h1 className="sr-only">Our Earth Brain</h1>
            <p className="font-serif italic text-2xl md:text-4xl text-amber-50 max-w-3xl mx-auto mb-16 opacity-90 leading-relaxed drop-shadow-lg text-glow">
              "Honoring the visionary life and movement founded by Krystina Poludnikiewicz."
            </p>

            <motion.div
              style={{
                opacity: opacityHero,
                scale: scaleHero,
                transformOrigin: 'bottom center'
              }}
              animate={{ y: [0, -15, 0] }}
              transition={{
                y: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className="inline-block relative group"
            >
              <div className="absolute -inset-4 bg-amber-400/20 rounded-[3rem] blur-xl group-hover:bg-amber-400/30 transition-all duration-1000"></div>
              {/* Image Container */}
              <div className="relative rounded-[2.5rem] p-0 bg-white/5 backdrop-blur-sm border border-white/20 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden">
                <img
                  src={krystinaHero}
                  alt="Our Earth Brain"
                  className="block w-auto h-auto max-w-full max-h-[50vh] rounded-[2.5rem] mx-auto scale-125 transition-transform duration-[20s] ease-linear hover:scale-110"
                  style={{ minHeight: '200px' }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Obituary / Tribute Section */}
      <section className="relative z-20 bg-white py-32 border-t border-emerald-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-amber-600 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">In Loving Memory</span>
            <h2 className="font-serif text-5xl text-emerald-950 italic mb-6">Krystina Poludnikiewicz</h2>
            <p className="text-emerald-800/60 font-serif italic text-xl">1985 — 2025</p>
          </div>

          <div className="prose prose-stone prose-xl mx-auto leading-loose font-serif text-emerald-950/80 space-y-10 text-justify">
            <p className="first-letter:text-7xl first-letter:font-bold first-letter:text-emerald-900 first-letter:mr-3 first-letter:float-left">
              Our free-spirited wonder daughter-sister-cousin-friend <strong className="text-emerald-900">Krystina Poludnikiewicz</strong> died suddenly and tragically in White Rock, British Columbia on <em>December 23, 2025</em>, after being struck by a motor vehicle while out for a noon time walk.
            </p>
            <p className="indent-12">
              She leaves so many behind including her dad, <strong>Richard Poludnikiewicz</strong> (stepmother Teresa Kuziomko), her mom, <strong>Mary Greene</strong>, and stepdad Douglas Adams, her brothers Mark and Stephen Poludnikiewicz, and Connor Adams, many aunts, uncles and cousins, as well as friends all over the globe.
            </p>
            <p className="indent-12">
              She was a nurse, an educator, a writer of both prose and poetry, a creative gift giver, an explorer of religions and cultures, a human social justice activist, animal rights activist, and she left a mark wherever she went and on whomever she met. She loved learning new things and had a passion for languages. Her mother tongue was English, but she spoke reasonable French and Hindi (which would shock the rickshaw drivers in India and any Hindus elsewhere in the world that she would strike up a conversation with). She was currently learning to read and write Punjabi. Her favorite books were <em className="text-emerald-800">'A Course in Miracles'</em> and the dictionary, and she loved playing with words (eg., significance- a sign if I can see).
            </p>
            <p className="indent-12">
              Her life goal was a <strong className="text-amber-700">new world order</strong> where people shared all 'things' and resources, and to that end she wrote her manifesto, called <em className="text-emerald-800">"Integrating Celebrating"</em> in 2017.
            </p>
            <p className="indent-12">
              Krystina travelled extensively in India and ended up in <strong className="text-emerald-800">Varanasi</strong> for about 11 years, participating in the running of a health care clinic in a slum. Other activities included creating a collective of the NGOs in the area for resource sharing and working to emancipate the untouchable caste using information. Her favorite project was the <em className="text-amber-700">'After School Fun School'</em> for the children of the slums.
            </p>
            <p className="indent-12">
              After travelling extensively in Europe and Asia, she eventually ended up back in North America, where she continued caring for people and participating in fundamental activities that looked out for humans and all living things.
            </p>

            <div className="py-12 text-center bg-white/60 rounded-xl my-10 border-y-2 border-emerald-900/10 shadow-sm">
              <p className="font-serif text-3xl md:text-4xl text-emerald-900 italic m-0">
                "Throughout her life, her smile would truly light up a room."
              </p>
            </div>

            <div className="mt-12 text-center">
              <Link to="/memorial" className="font-serif text-2xl italic text-emerald-800 hover:text-amber-600 border-b border-emerald-800/30 hover:border-amber-600 transition-colors pb-1">
                Click here to view Memorial Service details
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Preview with Texture */}
      <section className="py-32 bg-slate-50 bg-texture-leaf relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-20">
            <div className="w-full md:w-1/2">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400 to-amber-300 rounded-[2rem] blur-xl opacity-30 group-hover:opacity-50 transition duration-1000"></div>
                <img
                  src={krystinaMission}
                  className="rounded-[2rem] shadow-2xl relative z-10 border-4 border-white transform transition duration-700 group-hover:scale-[1.02]"
                  alt="Krystina in Nature"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <span className="text-amber-600 font-bold uppercase tracking-[0.2em] text-sm mb-4 block">The Vision</span>
              <h2 className="font-serif text-5xl md:text-6xl text-emerald-950 mb-8 leading-tight">
                Sentient <span className="italic text-amber-600">Earth</span>
              </h2>
              <div className="space-y-6 text-slate-600 leading-relaxed text-lg font-light">
                <p>
                  Krystina Poludnikiewicz founded Our Earth Brain with a singular, profound realization: that we are not observers of nature, but the organ through which the Earth reflects upon itself.
                </p>
                <p>
                  Her work transcended traditional environmentalism, moving into the realm of biocentric consciousness. She believed that by listening to the "whispers" of the land, we could heal our fractured relationship with the biosphere.
                </p>
              </div>
              <div className="mt-12">
                <Link to="/philosophy" className="inline-flex items-center text-emerald-900 font-bold uppercase tracking-widest text-sm hover:text-amber-600 transition-colors group">
                  Explore the Philosophy
                  <span className="ml-2 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center group-hover:translate-x-2 transition-transform">
                    <svg className="w-4 h-4 text-emerald-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quotes Section */}
      <section className="bg-emerald-950 py-32 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 opacity-10 animate-pulse">
          <svg className="w-[800px] h-[800px] text-emerald-400" viewBox="0 0 200 200" fill="currentColor"><circle cx="100" cy="100" r="80" /></svg>
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-amber-400 text-6xl font-serif block mb-8">"</span>
            <blockquote className="font-serif text-3xl md:text-5xl italic mb-10 max-w-4xl mx-auto leading-tight text-emerald-50">
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
