
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RSVPRecord } from '../types';

const Admin: React.FC = () => {
  const [records, setRecords] = useState<RSVPRecord[]>([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passphrase, setPassphrase] = useState('');
  const [lastSync, setLastSync] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('earth_brain_admin_data');
    if (saved) {
      setRecords(JSON.parse(saved));
      setLastSync(new Date().toLocaleTimeString());
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passphrase.toLowerCase() === 'earthbrain') {
      setIsAuthorized(true);
    } else {
      alert('Incorrect passphrase. Hint: earthbrain');
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

  if (!isAuthorized) {
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
          <p className="text-slate-500 text-center text-sm mb-8">Enter passphrase to view the RSVP Dashboard</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password"
              placeholder="Passphrase"
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
            />
            <button className="w-full bg-emerald-950 text-white font-black py-4 rounded-2xl uppercase tracking-widest text-xs hover:bg-emerald-800 transition-all shadow-lg">
              Unlock Dashboard
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
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                        record.attending === 'no' ? 'bg-red-50 text-red-600' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {record.attending}
                      </span>
                    </td>
                    <td className="p-6 text-emerald-950 font-medium">+{record.guests}</td>
                    <td className="p-6 text-slate-500 text-xs">{record.email}</td>
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
           <h4 className="font-serif text-2xl mb-4 text-amber-500">How to integrate with Google Sheets</h4>
           <p className="text-emerald-100 text-sm mb-6 leading-relaxed">
             This dashboard currently stores data locally on this device. To enable a shared "Cloud" database for $0:
           </p>
           <ol className="text-xs space-y-3 text-emerald-200 list-decimal pl-6">
             <li>Create a Google Sheet.</li>
             <li>Go to Extensions &gt; Apps Script.</li>
             <li>Paste the "doPost" code provided in your setup instructions.</li>
             <li>Deploy as a Web App (Access: Anyone).</li>
             <li>Paste the resulting URL into your <code className="bg-emerald-950 px-2 py-1 rounded text-amber-400">constants.tsx</code> file.</li>
           </ol>
        </div>
      </div>
    </div>
  );
};

export default Admin;
