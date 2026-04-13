import React, { useEffect } from 'react';
import { Heart, Users, BookOpen, GraduationCap, ArrowRight, HandHeart, Sparkles, Building, BarChart } from 'lucide-react';

export default function NgoSocietyArt({ setCurrentView }) {
  // Update SEO Meta Tags on Mount
  useEffect(() => {
    document.title = "SocietyArt NGO | Empowering Children Through Art";
    
    const setMeta = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    setMeta("description", "SocietyArt is an NGO dedicated to supporting underprivileged children with education, skill development through art, and community problem-solving schemes. Donate for child education today.");
    setMeta("keywords", "NGO for children education, support underprivileged children, donate for child education, skill development NGO, SocietyArt");
  }, []);

  const workInitiatives = [
    {
      icon: <Sparkles className="w-8 h-8 text-rose-600" />,
      title: "Skill Development",
      description: "Harnessing the transformative power of art to teach valuable, marketable skills that foster creativity and self-reliance."
    },
    {
      icon: <BookOpen className="w-8 h-8 text-rose-600" />,
      title: "Education Support",
      description: "Bridging the gap for children forced out of school by providing accessible educational resources and tutoring."
    },
    {
      icon: <Users className="w-8 h-8 text-rose-600" />,
      title: "Family Counseling",
      description: "Hosting dedicated problem-solving sessions with parents to address the root causes of child labor and poverty."
    },
    {
      icon: <Building className="w-8 h-8 text-rose-600" />,
      title: "Government Schemes",
      description: "Actively connecting marginalized families with life-changing government support systems and aid programs."
    },
    {
      icon: <BarChart className="w-8 h-8 text-rose-600" />,
      title: "Impact Research",
      description: "Conducting on-the-ground research during weekly field visits to uncover solutions for systemic lack of education."
    },
    {
      icon: <HandHeart className="w-8 h-8 text-rose-600" />,
      title: "Collaborative Action",
      description: "Partnering with allied NGOs and community groups to multiply our impact and reach more children in need."
    }
  ];

  const handleDonateClick = () => {
    alert("Thank you for your warm heart! The donation gateway is currently being set up. Please contact us to make a contribution directly.");
  };

  return (
    <div className="bg-stone-50 min-h-screen text-stone-800 font-sans mt-[-5rem] pt-[5rem]">
      {/* 
        HERO SECTION 
      */}
      <section className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop" 
            alt="Children smiling and painting"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-stone-900/60 mix-blend-multiply"></div>
          {/* Warm gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-rose-900/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white mt-12">
          <span className="inline-block py-1 px-3 rounded-full bg-rose-600/20 backdrop-blur-sm border border-rose-500/50 text-rose-100 text-sm font-semibold tracking-wider mb-6 animate-fade-in-up">
            PROJECT SOCIETYART
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight text-shadow-md">
            Coloring Futures, <br className="hidden md:block"/> Erasing Poverty.
          </h1>
          <p className="text-xl md:text-2xl text-stone-200 mb-10 max-w-3xl mx-auto font-light">
            We empower underprivileged children forced into daily labor by offering them a canvas of hope—through art, education, and community support.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={handleDonateClick}
              className="w-full sm:w-auto px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-lg transition-transform hover:scale-105 shadow-xl flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5 fill-current" />
              Donate Now
            </button>
            <button 
              onClick={() => setCurrentView('contact')}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2"
            >
              Join Our Mission
            </button>
          </div>
        </div>
      </section>

      {/* 
        ABOUT SECTION 
      */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm font-bold text-rose-600 tracking-widest uppercase mb-3">Our Story</h2>
              <h3 className="text-4xl font-serif font-bold text-stone-900 mb-6">
                Art is more than expression. It is a lifeline out of labor.
              </h3>
              <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                Every day, thousands of children pass by school gates, tools in their hands instead of books. At SocietyArt, we believe that creativity is the spark that can reignite a stolen childhood.
              </p>
              <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                By introducing art as a medium for skill development, we not only teach a trade but build confidence. We work directly in the communities, addressing the root causes of poverty, counseling parents, and connecting families to government support to ensure that a child's rightful place is in a classroom, not a factory.
              </p>
              <div className="flex gap-8">
                <div>
                  <p className="font-serif text-3xl font-bold text-stone-900">Vision</p>
                  <p className="text-stone-500 mt-2">A world where no child trades their education for survival.</p>
                </div>
                <div>
                  <p className="font-serif text-3xl font-bold text-stone-900">Mission</p>
                  <p className="text-stone-500 mt-2">To empower marginalized youth through creative skills and systemic community support.</p>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-rose-100 rounded-2xl transform rotate-3 transition-transform group-hover:rotate-6"></div>
              <img 
                src="https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?q=80&w=2048&auto=format&fit=crop" 
                alt="Child sketching thoughtfully" 
                className="relative rounded-2xl shadow-2xl object-cover h-[500px] w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 
        OUR WORK SECTION 
      */}
      <section className="py-24 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-rose-600 tracking-widest uppercase mb-3">What We Do</h2>
            <h3 className="text-4xl font-serif font-bold text-stone-900">A Comprehensive Approach to Empowerment</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workInitiatives.map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-16 h-16 bg-rose-50 rounded-xl flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold text-stone-900 mb-3">{item.title}</h4>
                <p className="text-stone-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 
        IMPACT SECTION 
      */}
      <section className="py-24 bg-stone-900 text-stone-100 relative overflow-hidden">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">Our Impact in Numbers</h2>
            <p className="text-xl text-stone-400 max-w-2xl mx-auto">Real change measured by the lives we touch every week during our field visits.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 text-center">
            {[
              { number: '1,200+', label: 'Children Reached' },
              { number: '45+', label: 'Weekly Field Visits' },
              { number: '300+', label: 'Families Counseled' },
              { number: '80%', label: 'School Re-enrollment' }
            ].map((stat, i) => (
              <div key={i} className="p-6 border border-stone-800 rounded-2xl bg-stone-800/30 backdrop-blur-sm">
                <p className="text-5xl font-bold text-rose-500 mb-2 font-serif">{stat.number}</p>
                <p className="text-stone-300 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Testimonial Placeholder */}
          <div className="bg-stone-800 rounded-3xl p-8 md:p-12 relative">
            <div className="absolute top-8 left-8 text-6xl text-rose-500/20 font-serif leading-none">"</div>
            <p className="text-2xl md:text-3xl text-stone-200 font-serif italic text-center max-w-4xl mx-auto leading-relaxed relative z-10">
              Before SocietyArt, my son worked in a garage 10 hours a day. Now, he is learning ceramics and attending school in the afternoon. They didn't just give him a brush, they gave us all a future.
            </p>
            <div className="mt-8 text-center">
              <p className="text-rose-400 font-bold text-lg">Anita D.</p>
              <p className="text-stone-400 text-sm mt-1">Mother of a 12-year-old student</p>
            </div>
          </div>
        </div>
      </section>

      {/* 
        DONATION & INVOLVEMENT SECTION 
      */}
      <section className="py-24 bg-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Donation Appeal */}
            <div className="bg-white p-10 md:p-14 rounded-3xl shadow-xl">
              <Heart className="w-12 h-12 text-rose-600 mb-6" />
              <h3 className="text-3xl font-serif font-bold text-stone-900 mb-4">Invest in a Child's Future</h3>
              <p className="text-stone-600 mb-8 text-lg">Your contribution directly funds art supplies, educational materials, and professional counseling for families. It costs very little to change the trajectory of a young life forever.</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 p-4 border border-rose-100 bg-rose-50/50 rounded-xl">
                  <span className="text-xl font-bold text-rose-600 w-16">₹500</span>
                  <span className="text-stone-700">Provides an art and study kit for one child</span>
                </div>
                <div className="flex items-center gap-4 p-4 border border-rose-100 bg-rose-50/50 rounded-xl">
                  <span className="text-xl font-bold text-rose-600 w-16">₹2000</span>
                  <span className="text-stone-700">Funds a weekly community counseling session</span>
                </div>
              </div>

              <button 
                onClick={handleDonateClick}
                className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-lg transition-colors shadow-lg"
              >
                Make a Secure Donation
              </button>
            </div>

            {/* Get Involved */}
            <div>
              <h2 className="text-sm font-bold text-rose-600 tracking-widest uppercase mb-3">Get Involved</h2>
              <h3 className="text-4xl font-serif font-bold text-stone-900 mb-8">We Need Your Hands & Voice</h3>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <GraduationCap className="w-8 h-8 text-rose-500 shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-stone-900 mb-2">Volunteer as an Art Mentor</h4>
                    <p className="text-stone-600">Spend a few hours a week teaching basic art skills, helping children discover their creative voice.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Users className="w-8 h-8 text-rose-500 shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-stone-900 mb-2">Join Field Visits</h4>
                    <p className="text-stone-600">Accompany our team on weekly outreach missions to connect with families and understand their struggles firsthand.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <HandHeart className="w-8 h-8 text-rose-500 shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-stone-900 mb-2">NGO Partner Network</h4>
                    <p className="text-stone-600">Are you part of another organization? Let's pool our resources and government scheme knowledge to maximize impact.</p>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => setCurrentView('contact')}
                className="mt-10 flex items-center gap-2 text-rose-600 font-bold hover:text-rose-800 transition-colors"
              >
                Contact us to volunteer <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 
        FINAL CTA BANNER 
      */}
      <section className="py-20 bg-stone-900 text-center px-4">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 max-w-3xl mx-auto">
          Every child deserves a chance to create their own masterpiece.
        </h2>
        <p className="text-xl text-stone-400 mb-10">Help us ensure that masterpiece isn't lost to child labor.</p>
        <button 
          onClick={handleDonateClick}
          className="px-10 py-5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xl transition-transform hover:scale-105 shadow-xl"
        >
          Help Change One Life Today
        </button>
      </section>
    </div>
  );
}
