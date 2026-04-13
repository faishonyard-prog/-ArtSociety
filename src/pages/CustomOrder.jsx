import React, { useState, useRef } from 'react';
import { Upload, CheckCircle, Clock, Heart, Star, Sparkles, Image as ImageIcon, Camera } from 'lucide-react';

function CustomOrder({ addToCart }) {
  const formRef = useRef(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    style: 'charcoal',
    size: 'a4',
    image: null,
    previewUrl: null,
    notes: ''
  });

  const pricing = {
    style: { charcoal: 50, watercolor: 80, oil: 150, digital: 40, mixed_media: 100, resin_art: 120 },
    size: { a4: 1, a3: 1.5, custom: 2 }
  };

  const calculatedPrice = pricing.style[formData.style] * pricing.size[formData.size];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        previewUrl: URL.createObjectURL(file)
      });
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: `custom-${Date.now()}`,
      name: `Custom ${formData.style} Portrait (${formData.size.toUpperCase()})`,
      price: calculatedPrice,
      img: formData.previewUrl || "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=200",
      custom: true,
      notes: formData.notes
    });
    setStep(4);
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const giftIdeas = [
    {
      title: "Weddings & Anniversaries",
      desc: "Turn your favorite wedding memory into a beautiful vintage oil painting or an elegant abstract couple portrait.",
      img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600",
      icon: <Heart size={20} className="text-rose-600" />
    },
    {
      title: "Birthdays & Milestones",
      desc: "Gift a custom resin piece with embedded birth month flowers or a stunning digital illustration of the birthday star.",
      img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600",
      icon: <Star size={20} className="text-rose-600" />
    },
    {
      title: "Home Decor Accents",
      desc: "Bespoke welcome nameplates, creative wall hangings with embedded family portraits, and textured abstract canvases.",
      img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600",
      icon: <Sparkles size={20} className="text-rose-600" />
    }
  ];

  return (
    <div className="animate-fade-in relative">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=2000" 
            alt="Custom Gifts" 
            className="w-full h-full object-cover object-center opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 via-stone-900/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 px-6 max-w-7xl mx-auto w-full">
          <div className="max-w-2xl">
            <span className="inline-block text-rose-300 font-medium tracking-widest uppercase text-sm mb-4 bg-stone-900/50 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10">Bespoke Art & Custom Gifts</span>
            <h1 className="text-5xl md:text-7xl font-serif text-white font-bold mb-6 drop-shadow-lg leading-tight">
              Crafting Your <span className="text-rose-400 italic">Special Moments</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-200 mb-10 font-light leading-relaxed">
              From creative wall hangings with wedding pictures to personalized abstract portraits, our bespoke creations are the perfect unique gift for any occasion.
            </p>
            <button 
              onClick={scrollToForm}
              className="bg-white text-stone-900 px-8 py-4 rounded-full font-bold hover:bg-rose-600 hover:text-white transition-all shadow-xl hover:-translate-y-1"
            >
              Start Your Custom Order
            </button>
          </div>
        </div>
      </section>

      {/* Ideas By Occasion Section */}
      <section className="py-24 bg-stone-50 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-stone-900 mb-4">Gifts for Every Occasion</h2>
            <p className="text-stone-600 max-w-2xl mx-auto text-lg">We have a rich array of unique gift ideas tailored perfectly to celebrate life's most beautiful chapters.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {giftIdeas.map((idea, index) => (
              <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group border border-stone-100">
                <div className="relative h-64 overflow-hidden">
                  <img src={idea.img} alt={idea.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-stone-900/20 group-hover:bg-stone-900/10 transition-colors"></div>
                  <div className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-md">
                    {idea.icon}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-serif font-bold text-stone-900 mb-3">{idea.title}</h3>
                  <p className="text-stone-600 leading-relaxed">{idea.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Custom Creations */}
      <section className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2 relative">
              <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-8 border-stone-50">
                <img src="/images/products/couple_wall_hanging.jpg" alt="Creative Wall Hanging" className="w-full h-full object-cover" />
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/50">
                  <div className="flex items-center gap-3 mb-2">
                    <Camera className="text-rose-600" size={20} />
                    <span className="font-bold text-stone-900 uppercase tracking-wider text-xs">Featured</span>
                  </div>
                  <h4 className="text-xl font-serif font-bold text-stone-900 mb-1">Creative Wall Hanging</h4>
                  <p className="text-stone-500 text-sm">Mixed media art integrating physical wedding photographs into a textured canvas.</p>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 space-y-8">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 leading-tight">Bring Your Ideas to Life</h2>
              <p className="text-lg text-stone-600 leading-relaxed font-light">
                Why settle for standard gifts when you can create something utterly unique? At Art Society, we specialize in weaving your personal photographs, memories, and concepts into breathtaking physical artworks. 
              </p>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="bg-rose-100 p-3 rounded-full text-rose-600 mt-1"><ImageIcon size={20}/></div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-xl font-serif mb-1">Custom Photo Integration</h4>
                    <p className="text-stone-600">We embed your beautiful wedding or family photos directly into mixed-media canvases or resin pieces.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-rose-100 p-3 rounded-full text-rose-600 mt-1"><Sparkles size={20}/></div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-xl font-serif mb-1">Hand-Painted Enhancements</h4>
                    <p className="text-stone-600">Every piece receives custom brushwork, adding texture, emotion, and an unmistakable handcrafted touch.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The Commission Form */}
      <section ref={formRef} className="py-24 bg-stone-100 relative z-10 border-t border-stone-200">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">Start Your Commission</h2>
            <p className="text-stone-600 text-lg">Upload your reference photos and select your preferences to get started.</p>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-stone-200 flex flex-col md:flex-row">
            <div className="p-8 md:p-12 md:w-3/5">
              {step === 1 && (
                <div className="animate-fade-in space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-stone-900 mb-5 flex items-center gap-3"><span className="bg-rose-100 text-rose-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-black">1</span> Choose Medium / Style</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(pricing.style).map(([key, price]) => (
                        <button 
                          key={key} 
                          onClick={() => setFormData({...formData, style: key})}
                          className={`p-4 border-2 rounded-2xl text-left transition-all ${formData.style === key ? 'border-rose-600 bg-rose-50 shadow-md' : 'border-stone-100 hover:border-rose-300 hover:bg-stone-50'}`}
                        >
                          <div className="font-bold capitalize text-stone-800 text-lg mb-1">{key.replace('_', ' ')}</div>
                          <div className="text-sm font-medium text-rose-600">Base ₹{price}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-stone-900 mb-5 flex items-center gap-3"><span className="bg-rose-100 text-rose-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-black">2</span> Choose Size</h3>
                    <select 
                      value={formData.size} 
                      onChange={(e) => setFormData({...formData, size: e.target.value})}
                      className="w-full p-4 border-2 border-stone-200 rounded-2xl bg-white focus:border-rose-500 focus:ring-0 outline-none uppercase text-sm font-bold text-stone-700 cursor-pointer"
                    >
                      <option value="a4">Standard A4 (8.3 x 11.7 in)</option>
                      <option value="a3">Large A3 (11.7 x 16.5 in) - +50%</option>
                      <option value="custom">Huge Custom Wall Size - +100%</option>
                    </select>
                  </div>
                  <button onClick={() => setStep(2)} className="w-full bg-stone-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-rose-600 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1">
                    Continue to Upload <span className="ml-2">→</span>
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="animate-fade-in space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-stone-900 mb-5 flex items-center gap-3"><span className="bg-rose-100 text-rose-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-black">3</span> Upload Photos</h3>
                    <label className="border-2 border-dashed border-stone-300 bg-stone-50 hover:bg-stone-100 transition-colors rounded-[2rem] p-10 flex flex-col items-center justify-center cursor-pointer min-h-[250px]">
                      {formData.previewUrl ? (
                         <div className="relative w-full aspect-video flex justify-center">
                            <img src={formData.previewUrl} alt="Preview" className="max-h-full rounded-xl shadow-md object-cover" />
                            <div className="absolute inset-0 bg-stone-900/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl text-white font-bold backdrop-blur-sm">Click to change photo</div>
                         </div>
                      ) : (
                        <>
                          <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                            <Upload className="text-rose-500" size={32} />
                          </div>
                          <span className="font-bold text-stone-800 text-lg mb-1">Upload your photo</span>
                          <span className="text-sm text-stone-500 text-center">High resolution wedding pics, portraits, or inspiration shots.</span>
                        </>
                      )}
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                    </label>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-stone-900 mb-5 flex items-center gap-3"><span className="bg-rose-100 text-rose-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-black">4</span> Special Instructions</h3>
                    <textarea 
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      placeholder="E.g., I'd like this as a creative wall hanging with gold accents. Please focus on our expressions..."
                      className="w-full p-5 border-2 border-stone-200 rounded-2xl bg-white focus:border-rose-500 focus:ring-0 outline-none text-base h-36 resize-none"
                    ></textarea>
                  </div>
                  
                  <div className="flex gap-4">
                    <button onClick={() => setStep(1)} className="w-1/3 bg-stone-100 text-stone-700 py-5 rounded-2xl font-bold hover:bg-stone-200 transition-colors">Back</button>
                    <button 
                      onClick={handleAddToCart} 
                      disabled={!formData.image}
                      className={`w-2/3 py-5 rounded-2xl font-bold text-lg transition-all shadow-lg ${formData.image ? 'bg-rose-600 text-white hover:bg-rose-700 hover:-translate-y-1' : 'bg-stone-200 text-stone-400 cursor-not-allowed shadow-none'}`}
                    >
                      Add Commission to Cart
                    </button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="animate-fade-in text-center py-16">
                  <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                    <CheckCircle size={48} />
                  </div>
                  <h2 className="text-4xl font-serif font-bold text-stone-900 mb-4">Request Added!</h2>
                  <p className="text-stone-600 text-lg mb-10 max-w-md mx-auto">Your custom commission details have been securely saved to your cart.</p>
                  <button onClick={() => { setStep(1); setFormData({style:'charcoal', size:'a4', image:null, previewUrl:null, notes:''}); }} className="text-rose-600 font-bold text-lg hover:text-rose-800 transition-colors border-b-2 border-rose-200 hover:border-rose-600 pb-1">
                    Start another custom gift
                  </button>
                </div>
              )}
            </div>

            <div className="bg-stone-900 text-stone-50 p-8 md:p-12 md:w-2/5 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-serif font-bold mb-8 text-white">Order Summary</h3>
                <div className="space-y-5 text-base border-b border-stone-700/50 pb-8 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-stone-400 capitalize">Style: {formData.style.replace('_', ' ')}</span>
                    <span className="font-medium text-white">₹{pricing.style[formData.style]}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-400 uppercase">Size: {formData.size}</span>
                    <span className="font-medium text-rose-300">x {pricing.size[formData.size]} multiplier</span>
                  </div>
                  <div className="flex justify-between items-center bg-stone-800/50 p-3 rounded-lg mt-2">
                    <span className="text-stone-300 flex items-center gap-2"><Sparkles size={14} className="text-yellow-400"/> Digital Proof</span>
                    <span className="text-green-400 font-bold text-sm tracking-widest uppercase">Included</span>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-stone-400 mb-1 text-sm uppercase tracking-wider font-bold">Estimated Total</span>
                  <span className="text-5xl font-serif font-bold text-white tracking-tight">₹{calculatedPrice}</span>
                </div>
              </div>

              <div className="mt-12 bg-stone-800/40 backdrop-blur-md p-6 rounded-2xl border border-stone-700/50 relative z-10">
                <h4 className="font-bold flex items-center gap-2 mb-3 text-white"><Clock size={18} className="text-rose-400"/> Crafting Timeline</h4>
                <p className="text-stone-400 text-sm leading-relaxed">Art takes time. Current processing time is 7-10 business days. You will receive a sketch proof via email for approval before final creation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CustomOrder;
