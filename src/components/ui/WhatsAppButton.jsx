import React from 'react';
import { MessageCircle } from 'lucide-react';

function WhatsAppButton() {
  return (
    <a 
      href="https://wa.me/919329561765" 
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 hover:shadow-[#25D366]/30 transition-all duration-300 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
      <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-white text-stone-800 px-3 py-1.5 rounded-lg text-sm font-medium shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Chat with Sakshi
      </span>
    </a>
  );
}

export default WhatsAppButton;
