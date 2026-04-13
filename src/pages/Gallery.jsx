import React, { useState } from 'react';
import { Maximize2, X } from 'lucide-react';

function Gallery({ gallery }) {
  const [selectedImg, setSelectedImg] = useState(null);

  // Filter out any entries without a valid URL
  const validGallery = gallery.filter(img => img.url).sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-6xl md:text-7xl font-serif font-bold text-stone-900 mb-6 tracking-tight">
            Art <span className="text-rose-700 italic font-light">Gallery</span>
          </h1>
          <p className="text-stone-500 max-w-2xl mx-auto text-lg leading-relaxed font-light">
            A curated collection of fine art, studio experiments, and commissioned works. 
            Each piece tells a unique story of color, light, and emotion.
          </p>
          <div className="w-24 h-px bg-stone-200 mx-auto mt-12"></div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-stone-50 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2"></div>
      </section>

      {/* Masonry-style Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
            {validGallery.map((img) => (
              <div 
                key={img.id}
                onClick={() => setSelectedImg(img)}
                className="relative group cursor-pointer overflow-hidden rounded-3xl bg-stone-100 shadow-sm hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 break-inside-avoid"
              >
                <img 
                  src={img.url} 
                  alt={img.caption} 
                  className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {img.caption && (
                      <p className="text-white font-serif text-xl font-medium mb-3">{img.caption}</p>
                    )}
                    <div className="flex items-center gap-2 text-white/80 text-sm font-bold tracking-widest uppercase">
                      <Maximize2 size={16} className="text-rose-400" />
                      <span>View Details</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {validGallery.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-stone-400 text-lg font-light italic">The gallery is currently preparing new works. Please visit again soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox / Modal */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/95 backdrop-blur-md p-4 animate-fade-in"
          onClick={() => setSelectedImg(null)}
        >
          <button 
            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
            onClick={() => setSelectedImg(null)}
          >
            <X size={32} />
          </button>

          <div 
            className="max-w-5xl w-full flex flex-col items-center gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImg.url} 
              alt={selectedImg.caption} 
              className="max-h-[80vh] w-auto rounded-2xl shadow-2xl ring-1 ring-white/10" 
            />
            {selectedImg.caption && (
              <div className="text-center">
                <p className="text-white text-2xl font-serif font-bold mb-1">{selectedImg.caption}</p>
                <div className="h-0.5 w-12 bg-rose-600 mx-auto mt-4"></div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Newsletter / CTA */}
      <section className="bg-stone-50 py-24 px-6 border-t border-stone-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6 italic">Interested in a custom portrait?</h2>
          <p className="text-stone-600 mb-10">Sakshi accepts a limited number of commissions each month. Secure your spot in the studio schedule today.</p>
          <button className="bg-stone-900 text-white px-10 py-4 rounded-full font-bold hover:bg-rose-700 transition-all shadow-xl hover:shadow-rose-900/20">
            Request Commission
          </button>
        </div>
      </section>
    </div>
  );
}

export default Gallery;
