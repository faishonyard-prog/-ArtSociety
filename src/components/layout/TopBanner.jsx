import React from 'react';
import { Clock } from 'lucide-react';

function TopBanner({ setCurrentView }) {
  return (
    <div className="bg-stone-900 text-rose-50 text-xs sm:text-sm py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
      <Clock size={14} className="text-rose-400" />
      <span>Only 3 custom portrait slots left for this month! <button onClick={() => setCurrentView('custom')} className="underline hover:text-rose-300 ml-1">Reserve yours now</button></span>
    </div>
  );
}

export default TopBanner;
