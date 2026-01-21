import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RSVP_BACKEND_URL } from '../constants';

const Bio: React.FC = () => {
    const [form, setForm] = useState({ name: '', memory: '' });
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const record = {
            ...form,
            type: 'bio_memory',
            id: Date.now().toString(),
            timestamp: new Date().toISOString()
        };

        try {
            // 1. Save Locally
            const existing = JSON.parse(localStorage.getItem('earth_brain_bio_memories') || '[]');
            localStorage.setItem('earth_brain_bio_memories', JSON.stringify([record, ...existing]));

            // 2. Sync to Cloud
            if (RSVP_BACKEND_URL) {
                await fetch(RSVP_BACKEND_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(record)
                });
            }

            setDone(true);
            setForm({ name: '', memory: '' });
        } catch (err) {
            console.error(err);
            alert("Connection issue. Your memory was saved locally and will sync later.");
            setDone(true); // Still show success since it's in localStorage
        } finally {
            setLoading(false);
        }
    };

    const timelineEvents = [
        { year: "The Beginning", title: "A Connection to Nature", desc: "From her earliest days, Krystina felt a profound kinship with the living world, spending hours listening to the forests." },
        { year: "The Awakening", title: "Biocentric Vision", desc: "She realized that human consciousness is not separate from Earth, but a function of it." },
        { year: "The Movement", title: "Founding Earth Brain", desc: "Krystina gathered a community of thinkers and feelers to explore this deep connection." },
        { year: "Legacy", title: "Eternal Impact", desc: "Her teachings continue to guide us as we protect and honor the biosphere." }
    ];

    return (
        <div className="bg-slate-50 min-h-screen pt-64 pb-20 px-6 bg-texture-leaf">
            <div className="container mx-auto max-w-5xl">

                {/* Hero Section */}
                <div className="text-center mb-20">
                    <span className="text-amber-600 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">The Journey</span>
                    <h1 className="font-serif text-6xl md:text-7xl text-emerald-950 mb-8 italic drop-shadow-sm">
                        The Life of <span className="text-gradient-gold">Krystina</span>
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
                    {/* Main Bio Text */}
                    <div className="lg:col-span-12 prose prose-emerald prose-lg text-slate-600 mx-auto text-center max-w-3xl">
                        <p className="font-serif text-3xl italic text-emerald-900 leading-relaxed mb-8">
                            "To plant a garden is to believe in <span className="text-amber-600">tomorrow</span>."
                        </p>
                        <p className="font-light text-xl leading-relaxed text-slate-700">
                            Krystina was not just a person, but a force of nature. Born with a deep sensitivity to the living world, she spent her life translating the silent language of the Earth into words we could understand. She taught us that every leaf, every stone, and every river has a voice.
                        </p>
                    </div>
                </div>

                {/* Vertical Timeline */}
                <div className="relative max-w-3xl mx-auto mb-32 pl-8 border-l-2 border-emerald-100 space-y-20">
                    {timelineEvents.map((event, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: index * 0.2 }}
                            className="relative pl-8 group"
                        >
                            {/* Dot on line */}
                            <div className="absolute -left-[41px] top-0 w-5 h-5 bg-amber-100 border-4 border-white rounded-full shadow-md group-hover:scale-125 group-hover:bg-amber-400 transition-all"></div>

                            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2 block">{event.year}</span>
                            <h3 className="font-serif text-3xl text-emerald-950 mb-3 group-hover:text-amber-700 transition-colors">{event.title}</h3>
                            <p className="text-slate-500 leading-relaxed font-light text-lg">{event.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Contribution Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="card-fancy p-10 md:p-16 relative">
                        {/* Decorative header */}
                        <div className="text-center mb-12">
                            <div className="inline-block p-4 rounded-full bg-amber-50 mb-6 shadow-inner">
                                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                            </div>
                            <h2 className="font-serif text-4xl text-emerald-950 mb-4">Contribute to the Archive</h2>
                            <p className="text-slate-500 max-w-lg mx-auto">Help us build a rich profile of Krystina's favorites and moments. Your memories keep her spirit alive.</p>
                        </div>

                        {done ? (
                            <div className="bg-emerald-50/50 p-10 rounded-3xl text-center border border-emerald-100">
                                <p className="font-serif text-3xl text-emerald-900 mb-4 italic">Thank you</p>
                                <p className="text-slate-600 mb-8">Your memory has been added to Krystina's permanent archive.</p>
                                <button onClick={() => setDone(false)} className="text-xs font-bold uppercase tracking-widest text-amber-600 hover:text-amber-500 border-b-2 border-amber-200 pb-1 hover:border-amber-500 transition-all">
                                    Submit Another
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-emerald-700/60 mb-3 ml-1">My Memory / Contribution</label>
                                    <textarea
                                        className="w-full p-6 bg-slate-50/50 rounded-2xl border border-slate-200 min-h-[160px] focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all placeholder:text-slate-300 font-serif text-xl leading-relaxed resize-none shadow-sm"
                                        required
                                        value={form.memory}
                                        onChange={e => setForm({ ...form, memory: e.target.value })}
                                        placeholder="I remember when..."
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-bold uppercase tracking-widest text-emerald-700/60 mb-3 ml-1">My Name (Optional)</label>
                                        <input
                                            type="text"
                                            className="w-full p-4 bg-slate-50/50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none shadow-sm"
                                            value={form.name}
                                            onChange={e => setForm({ ...form, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="flex items-end">
                                        <button
                                            disabled={loading}
                                            className="w-full h-[58px] bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold uppercase tracking-widest rounded-xl hover:shadow-lg hover:from-amber-400 hover:to-amber-500 transition-all text-xs"
                                        >
                                            {loading ? 'Saving...' : 'Submit'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Bio;
