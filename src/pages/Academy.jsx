import React, { useState } from 'react';
import { BookOpen, Users, Palette, Clock, CheckCircle, MapPin, Sparkles, Send } from 'lucide-react';

function Academy() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    course: 'Basic Painting',
    batch: 'Morning'
  });

  const courses = [
    {
      id: 'basic-painting',
      title: 'Basic Painting',
      price: 500,
      firstMonth: 800,
      tag: 'Beginner Friendly',
      desc: 'Learn the fundamentals of painting, color theory, and brush techniques. First month includes Artist Essential Pack.',
      icon: <Palette size={24} />,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      id: 'acrylic-painting',
      title: 'Acrylic Painting',
      price: 900,
      firstMonth: 1200,
      tag: 'Intermediate',
      desc: 'Master acrylic painting with advanced techniques and creative compositions.',
      icon: <BookOpen size={24} />,
      color: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      id: 'lippan-art',
      title: 'Lippan Art',
      price: 900,
      firstMonth: 1200,
      tag: 'Creative Crafts',
      desc: 'Explore traditional and modern decorative art styles with hands-on learning.',
      icon: <Sparkles size={24} />,
      color: 'bg-rose-50 text-rose-700 border-rose-200'
    },
    {
      id: 'embroidery',
      title: 'Embroidery',
      price: 900,
      firstMonth: 1200,
      tag: 'Creative Crafts',
      desc: 'Explore traditional and modern decorative art styles with hands-on learning.',
      icon: <Sparkles size={24} />,
      color: 'bg-rose-50 text-rose-700 border-rose-200'
    },
    {
      id: 'fabric-painting',
      title: 'Fabric Painting',
      price: 900,
      firstMonth: 1200,
      tag: 'Creative Crafts',
      desc: 'Explore traditional and modern decorative art styles with hands-on learning.',
      icon: <Sparkles size={24} />,
      color: 'bg-rose-50 text-rose-700 border-rose-200'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${formData.name}! Your enrollment request for ${formData.course} (${formData.batch} batch) has been sent. We will contact you at ${formData.phone} shortly.`);
    setFormData({ name: '', phone: '', course: 'Basic Painting', batch: 'Morning' });
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-24 relative overflow-hidden">
      {/* Global Background Layer for Academy */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply pointer-events-none">
        <img src="/images/bg-academy-1.png" alt="" className="w-full h-full object-cover grayscale" />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white/80 backdrop-blur-sm py-24 border-b border-stone-200">
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute top-0 -left-1/4 w-1/2 h-full bg-gradient-to-r from-rose-100 to-transparent blur-3xl rounded-full"></div>
          <div className="absolute bottom-0 -right-1/4 w-1/2 h-full bg-gradient-to-l from-amber-100 to-transparent blur-3xl rounded-full"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-8">
          <span className="bg-rose-50 text-rose-600 font-bold tracking-widest uppercase text-xs px-4 py-2 rounded-full border border-rose-200 shadow-sm">Art Society Academy</span>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-stone-900 leading-tight">
            Learn Art from Experts <br /> <span className="text-rose-700 italic font-light">at Home</span>
          </h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto font-light leading-relaxed">
            Join our creative community and explore your artistic potential with guided classes in a friendly, hands-on environment.
          </p>
          <div className="pt-4">
            <a href="#enroll" className="inline-block bg-stone-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-rose-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
              Enroll Now
            </a>
          </div>
        </div>
      </section>

      {/* Benefits Banner */}
      <section className="bg-stone-900 text-white py-8 border-b-4 border-rose-700 relative z-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-around items-center gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <Users className="text-rose-400" size={28} />
            <span className="font-semibold text-sm tracking-wide">Small Batch Sizes</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <CheckCircle className="text-amber-400" size={28} />
            <span className="font-semibold text-sm tracking-wide">Personalized Guidance</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Palette className="text-blue-400" size={28} />
            <span className="font-semibold text-sm tracking-wide">All Materials Guidance</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <MapPin className="text-emerald-400" size={28} />
            <span className="font-semibold text-sm tracking-wide">Offline Home Batches</span>
          </div>
          <div className="flex flex-col items-center gap-2">
             <Clock className="text-purple-400" size={28} />
             <span className="font-bold text-rose-400 text-sm tracking-wide animate-pulse">Limited Seats Available</span>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-stone-900 mb-4">Our Creative Courses</h2>
          <p className="text-stone-500 max-w-2xl mx-auto">Explore a variety of carefully structured programs designed to bring out your inner artist.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-3xl p-8 border border-stone-200 shadow-lg hover:shadow-2xl transition-all duration-300 relative group">
              <span className={`absolute -top-4 right-6 px-4 py-1.5 rounded-full text-xs font-bold border ${course.color} shadow-sm`}>
                {course.tag}
              </span>
              
              <div className="h-14 w-14 rounded-2xl bg-stone-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-stone-700">
                {course.icon}
              </div>
              
              <h3 className="text-2xl font-serif font-bold text-stone-900 mb-3">{course.title}</h3>
              <p className="text-stone-600 mb-6 font-light leading-relaxed">{course.desc}</p>
              
              <div className="space-y-3 mb-8 bg-stone-50 p-4 rounded-xl border border-stone-100">
                <div className="flex justify-between items-center bg-rose-50 p-2 rounded-lg border border-rose-100">
                  <span className="text-xs font-bold tracking-wider text-rose-800 uppercase">First Month Offer</span>
                  <span className="font-bold text-rose-700">₹{course.firstMonth}</span>
                </div>
                <div className="flex justify-between items-center px-2">
                  <span className="text-sm font-medium text-stone-500">Regular Monthly</span>
                  <span className="font-bold text-stone-900">₹{course.price}/mo</span>
                </div>
              </div>
              
              <a href="#enroll" className="block w-full text-center bg-stone-100 text-stone-800 font-bold py-3 rounded-xl hover:bg-stone-900 hover:text-white transition-colors">
                Select Course
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 border-y border-stone-200 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src="/images/bg-academy-2.jpg" alt="Art Background" className="w-full h-full object-cover grayscale" />
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl opacity-50 z-0"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-50 rounded-full blur-3xl opacity-50 z-0"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-stone-900 mb-4">What Our Students Say</h2>
            <div className="w-16 h-1 bg-rose-300 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { text: "The small batch sizes meant I actually got the attention I needed. My painting improved drastically in just one month!", author: "Priya S.", course: "Acrylic Painting" },
              { text: "Such a friendly learning environment! The first month kit was fantastic, everything was provided so I could just focus on art.", author: "Neha K.", course: "Basic Painting" },
              { text: "I learned Lippan Art here and it was completely hands-on. Highly recommend these home-based offline sessions.", author: "Anjali M.", course: "Lippan Art" }
            ].map((t, i) => (
              <div key={i} className="bg-stone-50 p-8 rounded-3xl border border-stone-100 relative shadow-sm">
                <span className="absolute top-6 left-6 text-6xl text-rose-200 font-serif leading-none">"</span>
                <p className="text-stone-700 italic relative z-10 mt-6 mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3 border-t border-stone-200 pt-4">
                  <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center font-bold text-rose-700">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">{t.author}</h4>
                    <span className="text-xs text-stone-500">{t.course}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enrollment Form */}
      <section id="enroll" className="py-24 max-w-3xl mx-auto px-6 scroll-mt-20">
        <div className="bg-white rounded-[2rem] shadow-2xl p-8 md:p-12 border border-stone-200 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-400 to-amber-400"></div>
          
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-2">Reserve Your Seat</h2>
            <p className="text-stone-500">Fill out this form and we'll reach out to confirm your slot.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all font-medium"
                  placeholder="Your Name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700">Phone Number</label>
                <input 
                  type="tel" 
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all font-medium"
                  placeholder="+91"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-700">Select Course</label>
              <select 
                value={formData.course}
                onChange={(e) => setFormData({...formData, course: e.target.value})}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all font-medium appearance-none"
              >
                {courses.map(c => <option key={c.id} value={c.title}>{c.title}</option>)}
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-700">Preferred Batch</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['Morning', 'Afternoon', 'Evening'].map(b => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setFormData({...formData, batch: b})}
                    className={`py-3 rounded-xl border font-bold text-sm transition-all flex items-center justify-center gap-2
                      ${formData.batch === b ? 'bg-stone-900 border-stone-900 text-white shadow-md' : 'bg-white border-stone-200 text-stone-600 hover:border-stone-400'}`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-rose-700 text-white font-bold text-lg py-4 rounded-xl hover:bg-rose-800 transition-all duration-300 shadow-lg hover:shadow-xl mt-4 flex justify-center items-center gap-2 group"
            >
              Submit Enrollment Request
              <Send size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-center text-xs text-stone-400 mt-4">* No payment required right now. We will contact you to discuss details and availability.</p>
          </form>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-stone-200 md:hidden z-50">
        <a href="#enroll" className="block w-full bg-stone-900 text-white text-center font-bold py-4 rounded-full shadow-lg">
          Reserve Your Slot
        </a>
      </div>
    </div>
  );
}

export default Academy;
