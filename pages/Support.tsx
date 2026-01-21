import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RSVP_BACKEND_URL } from '../constants';

interface Charity {
    id: string;
    name: string;
    url: string;
    description: string;
}

const Support: React.FC = () => {
    const [charities, setCharities] = useState<Charity[]>([]);
    const [suggestion, setSuggestion] = useState({ name: '', url: '', reason: '' });
    const [suggesting, setSuggesting] = useState(false);
    const [done, setDone] = useState(false);

    useEffect(() => {
        // NOTE: Firebase fetch is temporarily disabled due to configuration issues.
        // Falling back to hardcoded favorites for now.
        /*
        const fetchCharities = async () => {
             const q = query(collection(db, 'earthbrain_charities'), orderBy('name'));
             const snapshot = await getDocs(q);
             setCharities(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Charity)));
        };
        fetchCharities();
        */
    }, []);

    const handleSuggest = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuggesting(true);

        const record = {
            ...suggestion,
            type: 'charity_suggestion',
            id: Date.now().toString(),
            timestamp: new Date().toISOString()
        };

        try {
            // 1. Save Locally
            const existing = JSON.parse(localStorage.getItem('earth_brain_charity_suggestions') || '[]');
            localStorage.setItem('earth_brain_charity_suggestions', JSON.stringify([record, ...existing]));

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
            setSuggestion({ name: '', url: '', reason: '' });
        } catch (err) {
            console.error(err);
            alert("Connection issue. Your suggestion was saved locally.");
            setDone(true);
        } finally {
            setSuggesting(false);
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen pt-64 pb-20 px-6">
            <div className="container mx-auto max-w-4xl">

                {/* HERO: The Transcription Project */}
                <section className="mb-20">
                    <div className="opacity-100">
                        <span className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-4 block">The Great Work</span>
                        <h1 className="font-serif text-5xl md:text-6xl text-emerald-950 mb-8 italic">The Transcription Project</h1>
                        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-emerald-50 relative overflow-hidden">
                            <div className="relative z-10">
                                <p className="font-serif text-xl text-slate-600 leading-relaxed mb-8">
                                    Krystina wrote every single day. Her journals contain thousands of pages of insights on bettering the world, health, and philosophy.
                                    We are undertaking the massive task of transcribing, organizing, and publishing her complete works so the world can learn from her wisdom.
                                </p>
                                <p className="font-bold text-emerald-900 mb-8 uppercase tracking-widest text-sm">
                                    This effort requires significant funding for archival and editorial work.
                                </p>
                                <a
                                    href="https://buymeacoffee.com/mxrkis"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-emerald-950 px-10 py-5 rounded-full font-black uppercase tracking-widest text-sm transition-transform hover:scale-105 shadow-xl"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                    Fund the Transcription
                                </a>
                            </div>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                        </div>
                    </div>
                </section>

                {/* CHARITIES */}
                <section className="mb-20">
                    <div className="flex items-baseline justify-between mb-10">
                        <h2 className="font-serif text-4xl text-emerald-950 italic">Causes She Loved</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Hardcoded Favorites (fallback if DB empty) */}
                        <a href="https://www.basichumanneeds.org/donate" target="_blank" rel="noreferrer" className="bg-white p-8 rounded-[2.5rem] border border-emerald-50 hover:shadow-xl transition-all group block">
                            <h3 className="font-serif text-2xl text-emerald-950 mb-2 group-hover:text-amber-600 transition-colors">Basic Human Needs</h3>
                            <p className="text-xs font-bold uppercase tracking-widest text-emerald-700 mb-4">A Friend of the Movement</p>
                            <p className="text-slate-500 text-sm">Supporting the fundamental rights of every human being to survive and thrive.</p>
                        </a>

                        {charities.map(charity => (
                            <a key={charity.id} href={charity.url} target="_blank" rel="noreferrer" className="bg-white p-8 rounded-[2.5rem] border border-emerald-50 hover:shadow-xl transition-all group block">
                                <h3 className="font-serif text-2xl text-emerald-950 mb-2 group-hover:text-amber-600 transition-colors">{charity.name}</h3>
                                <p className="text-slate-500 text-sm">{charity.description}</p>
                            </a>
                        ))}
                    </div>
                </section>

                {/* SUGGESTION FORM */}
                <section className="bg-emerald-900 rounded-[3rem] p-10 md:p-16 text-white text-center">
                    <h2 className="font-serif text-3xl md:text-4xl mb-6 text-amber-500">Suggest a Cause</h2>
                    <p className="text-emerald-100 max-w-xl mx-auto mb-10 leading-relaxed">
                        Know of a charity that aligns with Krystina's vision? Suggest it here for inclusion in our curated list.
                    </p>

                    {done ? (
                        <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-sm">
                            <p className="font-serif text-2xl">Thank you. We will review your suggestion.</p>
                            <button onClick={() => setDone(false)} className="mt-4 text-xs font-bold uppercase tracking-widest text-emerald-300 hover:text-white">Suggest Another</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSuggest} className="max-w-md mx-auto space-y-4">
                            <input
                                type="text"
                                required
                                placeholder="Charity Name"
                                className="w-full p-4 bg-emerald-950/50 border border-emerald-800 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none placeholder:text-emerald-700"
                                value={suggestion.name}
                                onChange={e => setSuggestion({ ...suggestion, name: e.target.value })}
                            />
                            <input
                                type="url"
                                required
                                placeholder="Website URL (https://...)"
                                className="w-full p-4 bg-emerald-950/50 border border-emerald-800 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none placeholder:text-emerald-700"
                                value={suggestion.url}
                                onChange={e => setSuggestion({ ...suggestion, url: e.target.value })}
                            />
                            <textarea
                                placeholder="Why does this align with her vision?"
                                className="w-full p-4 bg-emerald-950/50 border border-emerald-800 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none placeholder:text-emerald-700 min-h-[100px]"
                                value={suggestion.reason}
                                onChange={e => setSuggestion({ ...suggestion, reason: e.target.value })}
                            />
                            <button
                                disabled={suggesting}
                                className="w-full bg-amber-500 text-emerald-950 font-bold py-4 rounded-xl uppercase tracking-widest hover:bg-amber-400 transition-colors"
                            >
                                {suggesting ? 'Submitting...' : 'Send Suggestion'}
                            </button>
                        </form>
                    )}
                </section>

            </div>
        </div>
    );
};

export default Support;
