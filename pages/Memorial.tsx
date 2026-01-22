
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MemorialBanner from '../components/MemorialBanner';
import { RSVPData, GuestbookEntry, RSVPRecord } from '../types';
import { GUESTBOOK_MOCK } from '../constants';
import { db } from '../src/firebase';
import { collection, addDoc, query, orderBy, getDocs } from 'firebase/firestore';

const Memorial: React.FC = () => {
  const [formData, setFormData] = useState<RSVPData>({
    name: '',
    email: '',
    attending: 'both',
    guests: 1,
    message: ''
  });
  const [isSyncing, setIsSyncing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);

  useEffect(() => {
    const fetchGuestbook = async () => {
      try {
        const q = query(collection(db, 'earthbrain_rsvps'), orderBy('timestamp', 'desc'));
        const sn = await getDocs(q);
        const data = sn.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));

        // Transform to GuestbookEntry and filter approved
        const publicEntries = data
          .filter(d => d.approved === true)
          .map(d => ({
            id: d.id,
            name: d.name,
            date: new Date(d.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            message: d.message || "Joining in celebration."
          }));

        setEntries(publicEntries.length > 0 ? publicEntries : GUESTBOOK_MOCK);
      } catch (err) {
        console.error("Error loading guestbook", err);
        setEntries(GUESTBOOK_MOCK);
      }
    };
    fetchGuestbook();
  }, []);

  const handleEmailFallback = () => {
    const subject = encodeURIComponent(`Memorial RSVP: ${formData.name}`);
    const body = encodeURIComponent(
      `RSVP Details:\n\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Attending: ${formData.attending}\n` +
      `Guests: ${formData.guests}\n` +
      `Message: ${formData.message}`
    );
    window.location.href = `mailto:krystina.memorial@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSyncing(true);

    const record = {
      ...formData,
      approved: false, // Explicitly pending
      type: 'rsvp',
      timestamp: new Date().toISOString()
    };

    try {
      await addDoc(collection(db, 'earthbrain_rsvps'), record);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert('Error submitting RSVP. Please try again or use the email fallback.');
    } finally {
      setIsSyncing(false);
    }
  };

  const googleMapsUrl = "https://www.google.com/maps/dir//Glen+Oaks+Funeral+Home+%26+Cemetery,+3164+Ninth+Line,+Oakville,+ON+L6H+7A8";

  return (
    <div className="relative min-h-screen">
      {/* Nature Banner */}
      <div className="absolute top-0 left-0 w-full h-[80vh] overflow-hidden z-0">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=2000"
          className="w-full h-full object-cover brightness-75"
          alt="Memorial Nature Background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-white/50 to-white" />
      </div>

      <div className="relative z-10 pt-48">
        <MemorialBanner />

        <section className="py-20 container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="opacity-100">
              <h1 className="font-serif text-5xl md:text-7xl text-emerald-950 mb-6 tracking-tight">Celebration of Life</h1>
              <p className="text-xl md:text-2xl text-slate-600 font-serif italic leading-relaxed">
                Celebrating the unique life, honest curiosity, and caring spirit of Krystina Poludnikiewicz.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Details Column */}
            <div className="space-y-12">
              <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-emerald-50">
                <h3 className="font-serif text-3xl text-emerald-900 mb-8 border-b border-emerald-100 pb-4">Service Schedule</h3>
                <div className="space-y-10">
                  <div className="relative pl-6 border-l-2 border-amber-500">
                    <div className="flex justify-between items-baseline mb-3">
                      <h4 className="font-bold text-xl text-emerald-950">Memorial Service</h4>
                      <span className="text-amber-600 font-bold bg-amber-50 px-3 py-1 rounded-full text-[10px] tracking-widest uppercase">3PM — 4PM</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-sm font-light">A shared ceremony to celebrate Krystina's journey and her honest look at the world around her.</p>
                  </div>
                  <div className="relative pl-6 border-l-2 border-emerald-900">
                    <div className="flex justify-between items-baseline mb-3">
                      <h4 className="font-bold text-xl text-emerald-950">Reception</h4>
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-full text-[10px] tracking-widest uppercase">4PM — 7PM</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-sm font-light">Gathering to share stories, look through her notebooks, and continue the conversations she started.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-emerald-50 overflow-hidden">
                <div className="flex justify-between items-center mb-8 border-b border-emerald-100 pb-4">
                  <h3 className="font-serif text-3xl text-emerald-900">Venue</h3>
                </div>
                <div className="mb-8">
                  <p className="font-bold text-emerald-950 text-xl mb-1">Glen Oaks Funeral Home</p>
                  <p className="text-slate-500 text-sm font-light tracking-wide">3164 Ninth Line, Oakville ON L6H 7A8</p>
                </div>

                <div className="relative aspect-video w-full rounded-[2rem] overflow-hidden shadow-2xl group cursor-pointer border border-emerald-100">
                  <img
                    src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=2000"
                    alt="Aerial view of peaceful landscape"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-90"
                  />
                  <div className="absolute inset-0 bg-emerald-950/20 group-hover:bg-emerald-950/40 transition-all flex flex-col items-center justify-center text-center p-6">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl mb-4 text-emerald-900 transform group-hover:scale-110 transition-all">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h4 className="text-white font-serif text-2xl mb-4">Glen Oaks Cemetery</h4>
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-amber-500 hover:bg-amber-400 text-emerald-950 px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest transition-all shadow-xl"
                    >
                      Launch Live Navigation
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* RSVP Form */}
            <div className="bg-emerald-900 text-white p-8 md:p-16 rounded-[4rem] shadow-2xl relative overflow-hidden h-fit lg:sticky lg:top-32">
              {!submitted ? (
                <>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-serif text-5xl">Kindly RSVP</h3>
                    {isSyncing && (
                      <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full border border-white/20">
                        <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                        <span className="text-[8px] font-black uppercase tracking-widest">Syncing...</span>
                      </div>
                    )}
                  </div>
                  <p className="text-emerald-300 mb-12 text-xs tracking-[0.2em] uppercase font-bold">Please respond by January 20, 2026</p>
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest font-black text-amber-500 mb-2">Full Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-emerald-950/50 border border-emerald-800 rounded-2xl p-5 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all placeholder:text-emerald-800"
                          placeholder="Name of Primary Guest"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest font-black text-amber-500 mb-2">Attendance Status</label>
                        <select
                          value={formData.attending}
                          onChange={e => setFormData({ ...formData, attending: e.target.value as any })}
                          className="w-full bg-emerald-950/50 border border-emerald-800 rounded-2xl p-5 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all appearance-none cursor-pointer"
                        >
                          <option value="both">Both Service & Reception</option>
                          <option value="memorial">Service Only</option>
                          <option value="celebration">Reception Only</option>
                          <option value="no">Respectfully Decline</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest font-black text-amber-500 mb-2">Guests</label>
                          <input
                            type="number"
                            min="1"
                            value={formData.guests}
                            onChange={e => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                            className="w-full bg-emerald-950/50 border border-emerald-800 rounded-2xl p-5 text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest font-black text-amber-500 mb-2">Family Note</label>
                        <textarea
                          rows={4}
                          value={formData.message}
                          onChange={e => setFormData({ ...formData, message: e.target.value })}
                          className="w-full bg-emerald-950/50 border border-emerald-800 rounded-2xl p-5 text-white placeholder:text-emerald-800"
                          placeholder="Share a thought with the Poludnikiewicz family..."
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={isSyncing}
                      className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-slate-700 text-emerald-950 font-black py-6 rounded-3xl uppercase tracking-widest shadow-2xl transition-all transform active:scale-95"
                    >
                      {isSyncing ? 'Connecting to Cloud...' : 'Confirm Presence'}
                    </button>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20"
                >
                  <div className="w-24 h-24 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-10 text-emerald-900 shadow-2xl">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="font-serif text-5xl mb-6 leading-tight">Thank you</h3>
                  <p className="text-emerald-200 mb-12 text-lg font-light leading-relaxed">Your response has been saved. We look forward to seeing you.</p>

                  <div className="space-y-4">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="w-full bg-white/10 hover:bg-white/20 px-10 py-4 rounded-2xl text-white font-bold uppercase tracking-widest text-[10px] transition-all"
                    >
                      Update Information
                    </button>
                    <button
                      onClick={handleEmailFallback}
                      className="w-full border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 px-10 py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] transition-all"
                    >
                      Also Send as Backup Email
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Community Guestbook Section */}
          <div className="mt-32">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-6xl text-emerald-950 mb-4 tracking-tight">Community Guestbook</h2>
              <div className="h-1 w-20 bg-amber-500 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence initial={false}>
                {entries.map((entry) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-emerald-50 hover:shadow-xl transition-shadow flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-4 py-2 rounded-full">
                        {entry.date}
                      </span>
                      <div className="text-amber-500">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                        </svg>
                      </div>
                    </div>
                    <p className="font-serif italic text-lg text-slate-600 mb-8 flex-grow leading-relaxed">
                      "{entry.message}"
                    </p>
                    <div className="pt-6 border-t border-slate-50">
                      <p className="font-black uppercase tracking-widest text-[11px] text-emerald-900">{entry.name}</p>
                      <p className="text-[9px] text-slate-400 uppercase tracking-widest mt-1">Verified Attendee</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Memorial;
