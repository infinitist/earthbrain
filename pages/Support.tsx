import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '../src/firebase';
import { collection, addDoc, query, orderBy, getDocs } from 'firebase/firestore';

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
        const fetchCharities = async () => {
            try {
                const q = query(collection(db, 'earthbrain_charities'), orderBy('name'));
                const snapshot = await getDocs(q);
                setCharities(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Charity)));
            } catch (err) {
                console.error("Error loading charities", err);
            }
        };
        fetchCharities();
    }, []);

    const handleSuggest = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuggesting(true);

        try {
            await addDoc(collection(db, 'earthbrain_charity_suggestions'), {
                name: suggestion.name,
                url: suggestion.url,
                reason: suggestion.reason,
                timestamp: new Date().toISOString()
            });

            setDone(true);
            setSuggestion({ name: '', url: '', reason: '' });
        } catch (err) {
            console.error(err);
            alert("Error sending suggestion. Please try again.");
        } finally {
            setSuggesting(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-slate-50">
            {/* Banner */}
            <div className="absolute top-0 left-0 w-full h-[60vh] overflow-hidden">
                <motion.img
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=2000" // Forest/Nature
                    className="w-full h-full object-cover opacity-80"
                    alt="Support Banner"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/30 via-transparent to-slate-50" />
            </div>

            <div className="relative z-10 pt-48 pb-20 px-6">
                <div className="container mx-auto max-w-4xl">

                    {/* HERO: The Transcription Project */}
                    <section className="mb-20">
                        <div className="opacity-100">
                            <span className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-4 block">Continuing the Conversation</span>
                            <h1 className="font-serif text-5xl md:text-6xl text-emerald-950 mb-8 italic">Sharing Her Journals</h1>
                            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-emerald-50 relative overflow-hidden">
                                <div className="relative z-10">
                                    <p className="font-serif text-xl text-slate-600 leading-relaxed mb-8">
                                        Krystina wrote every single day. Her journals are filled with thoughts on health, community, and the unique way she looked at the world.
                                        We are working to organize and share her writings so everyone can learn from her perspective.
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
                                        Fund the Journals
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
                            {charities.map(charity => (
                                <a key={charity.id} href={charity.url} target="_blank" rel="noreferrer" className="bg-white p-8 rounded-[2.5rem] border border-emerald-50 hover:shadow-xl transition-all group block">
                                    <h3 className="font-serif text-2xl text-emerald-950 mb-2 group-hover:text-amber-600 transition-colors">{charity.name}</h3>
                                    {charity.label && (
                                        <p className="text-xs font-bold uppercase tracking-widest text-emerald-700 mb-4">{charity.label}</p>
                                    )}
                                    <p className="text-slate-500 text-sm">{charity.description}</p>
                                </a>
                            ))}
                        </div>
                    </section>

                    {/* SUGGESTION FORM */}
                    <section className="bg-emerald-900 rounded-[3rem] p-10 md:p-16 text-white text-center">
                        <h2 className="font-serif text-3xl md:text-4xl mb-6 text-amber-500">Suggest a Cause</h2>
                        <p className="text-emerald-100 max-w-xl mx-auto mb-10 leading-relaxed">
                            Know of a cause that aligns with the things Krystina cared about? Suggest it here for the list.
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
                                    placeholder="Why do you think she would have liked this?"
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
        </div>
    );
};

export default Support;
