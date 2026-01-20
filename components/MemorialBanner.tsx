
import React from 'react';

const MemorialBanner: React.FC = () => {
  return (
    <div className="bg-amber-50 border-y border-amber-200 py-6 px-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-12">
        <div className="text-center md:text-left">
          <p className="uppercase tracking-[0.2em] text-[10px] font-bold text-amber-800 mb-1">Upcoming Service</p>
          <p className="font-serif text-lg text-emerald-900 font-bold">January 22, 2026</p>
        </div>
        <div className="h-px w-12 bg-amber-200 hidden md:block" />
        <div className="text-center md:text-left">
          <p className="uppercase tracking-[0.2em] text-[10px] font-bold text-amber-800 mb-1">Location</p>
          <p className="font-serif text-lg text-emerald-900 font-bold">Glen Oaks Funeral Home, Oakville</p>
        </div>
        <div className="h-px w-12 bg-amber-200 hidden md:block" />
        <div className="text-center md:text-left">
          <p className="uppercase tracking-[0.2em] text-[10px] font-bold text-amber-800 mb-1">Time</p>
          <p className="font-serif text-lg text-emerald-900 font-bold">3:00 PM — 7:00 PM</p>
        </div>
      </div>
    </div>
  );
};

export default MemorialBanner;
