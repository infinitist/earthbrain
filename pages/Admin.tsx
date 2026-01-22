
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RSVPRecord } from '../types';
import { auth, db } from '../src/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { collection, getDocs, orderBy, query, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const Admin: React.FC = () => {
  const [records, setRecords] = useState<RSVPRecord[]>([]);
  const [memories, setMemories] = useState<any[]>([]);
  const [charities, setCharities] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [newCharity, setNewCharity] = useState({ name: '', url: '', label: '', description: '' });
  const [editingCharity, setEditingCharity] = useState<{ id: string, name: string, url: string, label: string, description: string } | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastSync, setLastSync] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const qRsvp = query(collection(db, 'earthbrain_rsvps'), orderBy('timestamp', 'desc'));
        const snapRsvp = await getDocs(qRsvp);
        setRecords(snapRsvp.docs.map(doc => ({ id: doc.id, ...doc.data() }))); // Use Firestore data immediately
        setLastSync(new Date().toLocaleTimeString());

        const qMem = query(collection(db, 'earthbrain_memories'), orderBy('timestamp', 'desc'));
        const snapMem = await getDocs(qMem);
        setMemories(snapMem.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        const qChar = query(collection(db, 'earthbrain_charities'), orderBy('name'));
        const snapChar = await getDocs(qChar);
        setCharities(snapChar.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        const qSugg = query(collection(db, 'earthbrain_charity_suggestions'), orderBy('timestamp', 'desc'));
        const snapSugg = await getDocs(qSugg);
        setSuggestions(snapSugg.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        const qPosts = query(collection(db, 'earthbrain_posts'), orderBy('timestamp', 'desc'));
        const snapPosts = await getDocs(qPosts);
        setPosts(snapPosts.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      } catch (err) {
        console.error("Error loading admin data", err);
      }
    };
    fetchData();
  }, [user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      alert('Login failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleAddCharity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCharity.name) return;
    try {
      const docRef = await addDoc(collection(db, 'earthbrain_charities'), newCharity);
      setCharities(prev => [...prev, { id: docRef.id, ...newCharity }]);
      setNewCharity({ name: '', url: '', label: '', description: '' });
    } catch (err) {
      console.error(err);
      alert('Error adding charity');
    }
  };

  const handleDeleteCharity = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'earthbrain_charities', id));
      setCharities(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.error(err);
      alert('Error deleting charity');
    }
  };

  const handleUpdateCharity = async () => {
    if (!editingCharity) return;
    try {
      const charityRef = doc(db, 'earthbrain_charities', editingCharity.id);
      await updateDoc(charityRef, {
        name: editingCharity.name,
        url: editingCharity.url,
        label: editingCharity.label,
        description: editingCharity.description
      });
      setCharities(prev => prev.map(c => c.id === editingCharity.id ? { ...c, ...editingCharity } : c));
      setEditingCharity(null);
    } catch (err) {
      console.error(err);
      alert('Error updating charity');
    }
  };

  const handleApproveMemory = async (id: string) => {
    try {
      const memoryRef = doc(db, 'earthbrain_memories', id);
      await updateDoc(memoryRef, {
        approved: true,
        approvedAt: new Date().toISOString()
      });
      setMemories(prev => prev.map(m => m.id === id ? { ...m, approved: true } : m));
    } catch (err) {
      console.error(err);
      alert('Error approving memory');
    }
  };

  const handleRejectMemory = async (id: string) => {
    if (!window.confirm('Permanently delete this memory?')) return;
    try {
      await deleteDoc(doc(db, 'earthbrain_memories', id));
      setMemories(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      console.error(err);
      alert('Error deleting memory');
    }
  };

  const handleApprovePost = async (id: string) => {
    try {
      const postRef = doc(db, 'earthbrain_posts', id);
      await updateDoc(postRef, {
        approved: true,
        approvedAt: new Date().toISOString()
      });
      setPosts(prev => prev.map(p => p.id === id ? { ...p, approved: true } : p));
    } catch (err) {
      console.error(err);
      alert('Error approving post');
    }
  };

  const handleRejectPost = async (id: string) => {
    if (!window.confirm('Permanently delete this post?')) return;
    try {
      await deleteDoc(doc(db, 'earthbrain_posts', id));
      setPosts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
      alert('Error deleting post');
    }
  };

  const handleApproveRSVP = async (id: string) => {
    try {
      const ref = doc(db, 'earthbrain_rsvps', id);
      await updateDoc(ref, { approved: true });
      setRecords(prev => prev.map(r => r.id === id ? { ...r as any, approved: true } : r));
    } catch (err) {
      console.error(err);
      alert('Error approving RSVP for Guestbook');
    }
  };

  const handleApproveSuggestion = async (sugg: any) => {
    try {
      // 1. Add to Charities
      const newCharity = {
        name: sugg.name,
        url: sugg.url,
        label: 'Community Suggestion',
        description: sugg.reason || 'Community suggestion'
      };
      const docRef = await addDoc(collection(db, 'earthbrain_charities'), newCharity);
      setCharities(prev => [...prev, { id: docRef.id, ...newCharity }]);

      // 2. Delete from Suggestions
      await deleteDoc(doc(db, 'earthbrain_charity_suggestions', sugg.id));
      setSuggestions(prev => prev.filter(s => s.id !== sugg.id));

    } catch (err) {
      console.error(err);
      alert('Error approving charity suggestion');
    }
  };

  const clearData = () => {
    if (window.confirm('Are you sure you want to clear all test data?')) {
      localStorage.removeItem('earth_brain_admin_data');
      setRecords([]);
    }
  };

  const totals = records.reduce((acc, curr) => {
    if (curr.attending !== 'no') {
      acc.totalGuests += (curr.guests || 1);
      if (curr.attending === 'memorial' || curr.attending === 'both') acc.serviceCount += (curr.guests || 1);
      if (curr.attending === 'celebration' || curr.attending === 'both') acc.receptionCount += (curr.guests || 1);
    }
    return acc;
  }, { totalGuests: 0, serviceCount: 0, receptionCount: 0 });

  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-[3rem] shadow-2xl max-w-md w-full border border-emerald-100"
        >
          <div className="w-20 h-20 bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-8 text-amber-500">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002-2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
          <h2 className="font-serif text-3xl text-center text-emerald-950 mb-2">Organizer Access</h2>
          <p className="text-slate-500 text-center text-sm mb-8">Login to view the RSVP Dashboard</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
              required
            />
            <button
              disabled={loading}
              className="w-full bg-emerald-950 text-white font-black py-4 rounded-2xl uppercase tracking-widest text-xs hover:bg-emerald-800 transition-all shadow-lg disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Unlock Dashboard'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20 print:bg-white">
      <div className="bg-emerald-950 text-white pt-32 pb-20 px-6 print:hidden">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-amber-500 font-black uppercase tracking-[0.4em] text-[10px]">Internal Management</span>
                {lastSync && (
                  <span className="text-emerald-400 text-[9px] uppercase tracking-widest bg-emerald-900 px-3 py-1 rounded-full border border-emerald-800">
                    Last Device Sync: {lastSync}
                  </span>
                )}
              </div>
              <h1 className="font-serif text-5xl md:text-7xl">RSVP Dashboard</h1>
            </div>
            <div className="flex gap-4">
              <button onClick={handleLogout} className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                Logout
              </button>
              <button onClick={clearData} className="px-6 py-3 bg-white/10 hover:bg-red-500/20 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                Clear All Data
              </button>
              <button onClick={() => window.print()} className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-emerald-950 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                Print Check-in Sheet
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-10 print:mt-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-emerald-50 print:border-slate-200">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Expected Heads</p>
            <p className="text-5xl font-serif text-emerald-950">{totals.totalGuests}</p>
          </div>
          <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-emerald-50 print:border-slate-200">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Memorial Service</p>
            <p className="text-5xl font-serif text-emerald-950">{totals.serviceCount}</p>
          </div>
          <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-emerald-50 print:border-slate-200">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Reception Dinner</p>
            <p className="text-5xl font-serif text-emerald-950">{totals.receptionCount}</p>
          </div>
        </div>

        <div className="bg-white rounded-[3rem] shadow-xl border border-emerald-50 overflow-hidden print:shadow-none print:border-none">
          <div className="p-8 border-b border-slate-100 flex justify-between items-center print:px-0">
            <h3 className="font-serif text-2xl text-emerald-900">Registered Guests List</h3>
            <span className="text-[10px] font-black bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full uppercase print:hidden">
              {records.length} Submissions Total
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Guest Name</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Attendance</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Party</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Contact/Email</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400 print:hidden">Guestbook</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400 print:hidden">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {records.length > 0 ? records.map((record) => (
                  <tr key={record.id} className="hover:bg-emerald-50/30 transition-colors">
                    <td className="p-6">
                      <p className="font-bold text-emerald-950">{record.name}</p>
                      <p className="text-[9px] text-slate-400 uppercase tracking-tighter">{new Date(record.timestamp).toLocaleString()}</p>
                    </td>
                    <td className="p-6">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${record.attending === 'no' ? 'bg-red-50 text-red-600' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                        {record.attending}
                      </span>
                    </td>
                    <td className="p-6 text-emerald-950 font-medium">+{record.guests}</td>
                    <td className="p-6 text-slate-500 text-xs">{record.email}</td>
                    <td className="p-6 print:hidden">
                      {!(record as any).approved ? (
                        <button onClick={() => handleApproveRSVP(record.id)} className="text-[9px] bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full hover:bg-emerald-200 uppercase font-black tracking-wider transition-colors">Approve</button>
                      ) : (
                        <span className="text-[9px] text-emerald-600 font-bold uppercase tracking-wider">✓ Public</span>
                      )}
                    </td>
                    <td className="p-6 text-slate-500 text-sm italic max-w-xs truncate print:hidden" title={record.message}>
                      {record.message || '—'}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="p-20 text-center text-slate-400 italic">
                      Waiting for submissions...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-12 p-8 bg-emerald-900 rounded-[2.5rem] text-white print:hidden">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-serif text-3xl text-amber-500">Community Memories</h4>
            <span className="text-xs bg-emerald-800 px-3 py-1 rounded-full">{memories.length} Stories Collected</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[500px] overflow-y-auto">
            {memories.map((mem: any) => (
              <div key={mem.id} className="bg-emerald-950/50 p-6 rounded-2xl border border-emerald-800 relative">
                <div className="flex justify-between items-start mb-3">
                  <span className={`px-2 py-1 rounded-full text-[9px] font-bold uppercase ${mem.approved ? 'bg-green-500 text-white' : 'bg-amber-400 text-emerald-950'}`}>
                    {mem.approved ? '✓ Published' : '⏳ Pending'}
                  </span>
                </div>
                <p className="font-serif italic text-lg text-emerald-50 mb-4">"{mem.memory}"</p>
                <div className="flex justify-between items-center text-xs text-emerald-400 font-bold uppercase tracking-widest mb-3">
                  <span>— {mem.name || 'Anonymous'}</span>
                  <span>{new Date(mem.timestamp).toLocaleDateString()}</span>
                </div>
                <div className="flex gap-2 mt-4 pt-4 border-t border-emerald-800">
                  {!mem.approved ? (
                    <>
                      <button
                        onClick={() => handleApproveMemory(mem.id)}
                        className="flex-1 bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-lg text-xs font-bold uppercase"
                      >
                        ✓ Approve
                      </button>
                      <button
                        onClick={() => handleRejectMemory(mem.id)}
                        className="flex-1 bg-red-600/80 hover:bg-red-500 text-white py-2 px-4 rounded-lg text-xs font-bold uppercase"
                      >
                        ✕ Reject
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleRejectMemory(mem.id)}
                      className="w-full bg-red-600/80 hover:bg-red-500 text-white py-2 px-4 rounded-lg text-xs font-bold uppercase"
                    >
                      🗑 Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
            {memories.length === 0 && (
              <p className="text-emerald-400 italic">No memories submitted yet.</p>
            )}
          </div>
        </div>

        {/* Community Wall Management */}
        <div className="mt-12 p-8 bg-emerald-900 rounded-[2.5rem] text-white print:hidden">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-serif text-3xl text-amber-500">Community Wall</h4>
            <span className="text-xs bg-emerald-800 px-3 py-1 rounded-full">{posts.length} Posts</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[600px] overflow-y-auto">
            {posts.map((post: any) => (
              <div key={post.id} className="bg-emerald-950/50 p-6 rounded-2xl border border-emerald-800 relative">
                <div className="flex justify-between items-start mb-3">
                  <span className={`px-2 py-1 rounded-full text-[9px] font-bold uppercase ${post.approved ? 'bg-green-500 text-white' : 'bg-amber-400 text-emerald-950'}`}>
                    {post.approved ? '✓ Published' : '⏳ Pending'}
                  </span>
                </div>

                {post.imageUrl && (
                  <img src={post.imageUrl} className="w-full h-48 object-cover rounded-xl mb-4" alt="Post" />
                )}

                <p className="font-serif italic text-lg text-emerald-50 mb-2">"{post.caption}"</p>
                <div className="flex justify-between items-center text-xs text-emerald-400 font-bold uppercase tracking-widest mb-3">
                  <span>— {post.userName}</span>
                  <span>{new Date(post.timestamp).toLocaleDateString()}</span>
                </div>

                <div className="flex gap-2 mt-4 pt-4 border-t border-emerald-800">
                  {!post.approved ? (
                    <>
                      <button
                        onClick={() => handleApprovePost(post.id)}
                        className="flex-1 bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-lg text-xs font-bold uppercase"
                      >
                        ✓ Approve
                      </button>
                      <button
                        onClick={() => handleRejectPost(post.id)}
                        className="flex-1 bg-red-600/80 hover:bg-red-500 text-white py-2 px-4 rounded-lg text-xs font-bold uppercase"
                      >
                        ✕ Reject
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleRejectPost(post.id)}
                      className="w-full bg-red-600/80 hover:bg-red-500 text-white py-2 px-4 rounded-lg text-xs font-bold uppercase"
                    >
                      🗑 Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
            {posts.length === 0 && (
              <p className="text-emerald-400 italic">No posts submitted yet.</p>
            )}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 print:hidden">
          {/* Charity Management */}
          <div className="bg-emerald-900 p-8 rounded-[2.5rem] text-white">
            <h4 className="font-serif text-3xl text-amber-500 mb-6">Manage Charities</h4>

            <form onSubmit={handleAddCharity} className="space-y-4 mb-8 bg-black/20 p-6 rounded-2xl">
              <input
                className="w-full p-3 bg-emerald-950/50 border border-emerald-800 rounded-xl text-sm"
                placeholder="Charity Name"
                value={newCharity.name}
                onChange={e => setNewCharity({ ...newCharity, name: e.target.value })}
              />
              <input
                className="w-full p-3 bg-emerald-950/50 border border-emerald-800 rounded-xl text-sm"
                placeholder="Label (e.g., 'A Cause She Valued')"
                value={newCharity.label}
                onChange={e => setNewCharity({ ...newCharity, label: e.target.value })}
              />
              <input
                className="w-full p-3 bg-emerald-950/50 border border-emerald-800 rounded-xl text-sm"
                placeholder="URL"
                value={newCharity.url}
                onChange={e => setNewCharity({ ...newCharity, url: e.target.value })}
              />
              <input
                className="w-full p-3 bg-emerald-950/50 border border-emerald-800 rounded-xl text-sm"
                placeholder="Description"
                value={newCharity.description}
                onChange={e => setNewCharity({ ...newCharity, description: e.target.value })}
              />
              <button className="w-full bg-emerald-700 hover:bg-emerald-600 py-2 rounded-xl text-xs font-bold uppercase tracking-widest">
                Add Charity
              </button>
            </form>

            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {charities.map((char: any) => (
                <div key={char.id} className="bg-emerald-950/30 p-4 rounded-xl">
                  {editingCharity?.id === char.id ? (
                    // Edit Mode
                    <div className="space-y-3">
                      <input
                        className="w-full p-2 bg-emerald-950/50 border border-emerald-800 rounded-lg text-sm text-white"
                        value={editingCharity.name}
                        onChange={e => setEditingCharity({ ...editingCharity, name: e.target.value })}
                        placeholder="Charity Name"
                      />
                      <input
                        className="w-full p-2 bg-emerald-950/50 border border-emerald-800 rounded-lg text-sm text-white"
                        value={editingCharity.label}
                        onChange={e => setEditingCharity({ ...editingCharity, label: e.target.value })}
                        placeholder="Label (e.g., 'A Cause She Valued')"
                      />
                      <input
                        className="w-full p-2 bg-emerald-950/50 border border-emerald-800 rounded-lg text-sm text-white"
                        value={editingCharity.url}
                        onChange={e => setEditingCharity({ ...editingCharity, url: e.target.value })}
                        placeholder="URL"
                      />
                      <textarea
                        className="w-full p-2 bg-emerald-950/50 border border-emerald-800 rounded-lg text-sm text-white resize-none"
                        value={editingCharity.description}
                        onChange={e => setEditingCharity({ ...editingCharity, description: e.target.value })}
                        placeholder="Description"
                        rows={2}
                      />
                      <div className="flex gap-2">
                        <button onClick={handleUpdateCharity} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-lg text-xs font-bold uppercase">Save</button>
                        <button onClick={() => setEditingCharity(null)} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg text-xs font-bold uppercase">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <>
                      <div className="mb-2">
                        <p className="font-bold text-sm">{char.name}</p>
                        <a href={char.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-emerald-400 hover:text-emerald-300 underline">{char.url}</a>
                      </div>
                      {char.description && (
                        <p className="text-xs text-emerald-100/70 italic mb-3 leading-relaxed">"{char.description}"</p>
                      )}
                      <div className="flex gap-2 pt-2 border-t border-emerald-800/30">
                        <button onClick={() => setEditingCharity({ id: char.id, name: char.name, url: char.url, description: char.description || '' })} className="text-xs text-emerald-400 hover:text-emerald-300 font-bold uppercase tracking-wider">Edit</button>
                        <button onClick={() => handleDeleteCharity(char.id)} className="text-xs text-red-400 hover:text-red-300 font-bold uppercase tracking-wider">Delete</button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* User Suggestions */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-emerald-50">
            <h4 className="font-serif text-3xl text-emerald-900 mb-6">User Suggestions</h4>
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {suggestions.map((sugg: any) => (
                <div key={sugg.id} className="bg-slate-50 p-6 rounded-2xl">
                  <p className="font-bold text-emerald-950 mb-1">{sugg.name}</p>
                  <a href={sugg.url} target="_blank" className="text-xs text-amber-600 hover:underline mb-2 block">{sugg.url}</a>
                  <p className="text-slate-600 text-sm italic">"{sugg.reason}"</p>
                  <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
                    <button onClick={() => handleApproveSuggestion(sugg)} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg py-2 text-[10px] font-bold uppercase tracking-widest transition-all">
                      ✓ Add to List
                    </button>
                    <button onClick={async () => {
                      try {
                        await deleteDoc(doc(db, 'earthbrain_charity_suggestions', sugg.id));
                        setSuggestions(prev => prev.filter(s => s.id !== sugg.id));
                      } catch (err) {
                        console.error(err);
                        alert('Error deleting suggestion');
                      }
                    }} className="px-4 bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all">Delete</button>
                  </div>
                </div>
              ))}
              {suggestions.length === 0 && <p className="text-slate-400 italic">No suggestions yet.</p>}
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default Admin;
