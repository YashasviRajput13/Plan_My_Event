
import React, { useState } from 'react';
import { EVENT_TYPES, CITIES, SERVICE_CATEGORIES, MOCK_VENDORS } from '../constants';
import { EventType } from '../types';

interface LandingPageProps {
  onStartPlanning: (data?: { type: string, city: string }) => void;
  onPartnerWithUs: () => void;
  onExplore: () => void;
  onCategoryClick: (category: string) => void;
}

const EXPERT_SERVICE_IMAGES = [
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800', // DJ (Microphone)
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800', // Planner (Dining table setup)
  'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800', // Decorator (Grand Ballroom)
  'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&q=80&w=800', // Photographer (Professional Camera)
  'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800', // Caterer (Buffet spread)
];

const STAGGER_OFFSETS = [
  'translate-y-0',
  'translate-y-16',
  'translate-y-[-2rem]',
  'translate-y-24',
  'translate-y-8'
];

const LandingPage: React.FC<LandingPageProps> = ({ onStartPlanning, onPartnerWithUs, onExplore, onCategoryClick }) => {
  const [selectedType, setSelectedType] = useState('Select Event Type');
  const [selectedCity, setSelectedCity] = useState('Select City');

  const handleHeroSubmit = () => {
    onStartPlanning({
      type: selectedType === 'Select Event Type' ? 'Wedding' : selectedType,
      city: selectedCity === 'Select City' ? 'Mumbai' : selectedCity
    });
  };

  return (
    <div className="animate-fade-in-up">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover"
          >
            <source src="https://www.luxurymywedding.com/videos/video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/40 to-navy/80"></div>
          <div className="absolute inset-0 backdrop-blur-[1px]"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
          <div className="inline-block mb-6 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            <span className="text-champagne text-xs font-bold uppercase tracking-[0.3em]">India's #1 Event Platform</span>
          </div>
          <h1 className="font-display text-5xl md:text-8xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
            Your Occasion. <br />
            <span className="text-champagne italic serif font-normal">Our Masterpiece.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            From intimate gatherings to grand celebrations. Discover and book India's most trusted event vendors with 100% price transparency.
          </p>

          <div className="bg-white/10 backdrop-blur-2xl p-3 rounded-2xl md:rounded-full flex flex-col md:flex-row gap-3 max-w-4xl mx-auto shadow-[0_32px_64px_-15px_rgba(0,0,0,0.5)] border border-white/20">
            <div className="flex-1 flex items-center px-6 py-2">
              <span className="text-white/40 mr-3 text-xl">🎉</span>
              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-transparent border-none text-white w-full focus:ring-0 appearance-none font-medium cursor-pointer"
              >
                <option className="text-navy">Select Event Type</option>
                {EVENT_TYPES.map(type => <option key={type} className="text-navy">{type}</option>)}
              </select>
            </div>
            <div className="w-px bg-white/20 hidden md:block my-3"></div>
            <div className="flex-1 flex items-center px-6 py-2">
              <span className="text-white/40 mr-3 text-xl">📍</span>
              <select 
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-transparent border-none text-white w-full focus:ring-0 appearance-none font-medium cursor-pointer"
              >
                <option className="text-navy">Select City</option>
                {CITIES.map(city => <option key={city} className="text-navy">{city}</option>)}
              </select>
            </div>
            <button 
              onClick={handleHeroSubmit}
              className="bg-champagne text-navy px-12 py-4 rounded-xl md:rounded-full font-bold hover:bg-white transition-all transform hover:scale-[1.02] active:scale-95 shadow-xl"
            >
              Start Planning
            </button>
          </div>
        </div>
      </section>

      {/* Stats / Trust */}
      <section className="py-16 bg-white border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: 'Verified Partners', val: '5,000+' },
            { label: 'Events Managed', val: '12,000+' },
            { label: 'Family Smiles', val: '10,000+' },
            { label: 'Cities Nationwide', val: '50+' },
          ].map(stat => (
            <div key={stat.label} className="group cursor-default">
              <h4 className="text-4xl font-bold text-navy font-display mb-2 group-hover:text-gold transition-colors duration-500">{stat.val}</h4>
              <p className="text-[10px] text-navy/40 uppercase tracking-[0.2em] font-bold">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Expert Services Staggered Section */}
      <section className="py-40 bg-black overflow-hidden" id="services-section">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-32">
            <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-6">Expert Services <br/><span className="text-[#00A884] italic font-normal">for your masterpiece.</span></h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto">Precision planning, cinematic execution, and flawless management across India.</p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-8 min-h-[700px]">
            {SERVICE_CATEGORIES.map((cat, idx) => {
              const heights = ['h-[420px]', 'h-[460px]', 'h-[500px]', 'h-[440px]', 'h-[400px]'];
              const delays = ['stagger-delay-1', 'stagger-delay-2', 'stagger-delay-3', 'stagger-delay-4', 'stagger-delay-5'];
              return (
                <div 
                  key={cat.id} 
                  className={`flex-1 group flex flex-col items-center animate-fade-in-up ${delays[idx]} ${STAGGER_OFFSETS[idx]} transition-transform duration-700`}
                >
                  {/* Connecting Line and Dot UI */}
                  <div className="mb-6">
                    <div className="marker-dot"></div>
                    <div className="marker-line h-[80px]"></div>
                  </div>

                  {/* Staggered Card */}
                  <div 
                    onClick={() => onCategoryClick(cat.id)}
                    className={`stagger-card w-full ${heights[idx]} relative rounded-[2.5rem] overflow-hidden cursor-pointer bg-navy/20 border border-white/5 shadow-2xl transition-all duration-700`}
                  >
                    <img 
                      src={EXPERT_SERVICE_IMAGES[idx]} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                      alt={cat.label} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                       <span className="px-6 py-2 bg-white text-navy font-bold rounded-full text-xs uppercase tracking-widest shadow-2xl">View Network</span>
                    </div>
                  </div>

                  {/* Label */}
                  <div className="mt-8 text-center">
                    <h3 className="text-white/40 group-hover:text-white font-bold text-[10px] md:text-xs uppercase tracking-[0.4em] transition-colors duration-500 whitespace-nowrap">
                      {cat.label}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Problem / Solution Section */}
      <section className="relative py-32 bg-navy overflow-hidden" id="how-it-works-section">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.pinimg.com/1200x/01/98/ca/0198ca733ac88a0897ba81c823ff5b30.jpg" 
            className="w-full h-full object-cover scale-110 brightness-[0.35]"
            alt="Live Performance Crowd Background"
          />
          <div className="absolute inset-0 bg-navy/80 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <div className="inline-block mb-6 px-5 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/20">
              <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em]">Why PlanMyEvent?</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-10 leading-tight text-white">
              Eliminate the <br />
              <span className="text-champagne italic serif font-normal text-4xl md:text-5xl">chaos</span> of planning.
            </h2>
            <div className="space-y-6">
              {[
                { title: 'Centralized Booking', desc: 'Manage vendors, quotes, and contracts in one elegant dashboard. No more fragmented WhatsApp threads.' },
                { title: 'Verified Transparency', desc: 'No hidden markups. See verified reviews and standard pricing before you even say hello.' },
                { title: 'Secure Milestone Payments', desc: 'Pay 20% advance securely through us. Your money is safe until the service is delivered.' },
              ].map((item, idx) => (
                <div key={idx} className="group p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="flex gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 text-white group-hover:scale-110 transition-transform">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-2 text-white">{item.title}</h4>
                      <p className="text-white/80 leading-relaxed font-light">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative flex justify-center lg:justify-end">
             <div className="absolute -top-20 -right-20 w-80 h-80 bg-gold/10 rounded-full blur-[100px]"></div>
             <div className="relative group">
               <div className="absolute -inset-1 bg-gradient-to-r from-gold/30 to-peach/30 rounded-[3rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
               <img 
                 src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200" 
                 className="rounded-[3rem] shadow-2xl relative z-10 w-full max-w-lg transform group-hover:scale-[1.01] transition-transform duration-700"
                 alt="Grand Corporate Event"
               />
               <div className="absolute -bottom-10 -left-10 bg-white p-10 rounded-[2rem] shadow-2xl z-20 text-navy max-w-[240px] border border-gold/10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-3xl font-bold font-display text-gold">92%</span>
                    <span className="text-[10px] font-bold text-navy/40 leading-none uppercase">Success<br/>Rate</span>
                  </div>
                  <p className="text-xs text-navy/60 font-medium">Clients report a significantly smoother experience compared to offline planning.</p>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Featured Vendors */}
      <section className="py-32 bg-white" id="vendors-section">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-24">
            <h2 className="font-display text-5xl font-bold text-navy mb-6">Handpicked <span className="text-gold italic font-normal">Premiere</span> Vendors</h2>
            <p className="text-navy/50 text-lg max-w-2xl mx-auto">Only the top 5% of applicants make it to our featured list after a rigorous 30-point quality check.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {MOCK_VENDORS.slice(0, 3).map(vendor => (
              <div 
                key={vendor.id} 
                className="bg-white rounded-[2rem] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500 group border border-gold/5 cursor-pointer" 
                onClick={() => onCategoryClick(vendor.category)}
              >
                <div className="h-72 overflow-hidden relative">
                  <img src={vendor.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={vendor.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-60"></div>
                  {vendor.featured && (
                    <span className="absolute top-6 left-6 bg-white/10 backdrop-blur-md text-white text-[9px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.2em] border border-white/20">
                      Top Rated
                    </span>
                  )}
                  <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur px-4 py-2 rounded-2xl text-navy font-bold text-sm shadow-xl flex items-center gap-1.5">
                    <span className="text-gold">★</span> {vendor.rating}
                  </div>
                </div>
                <div className="p-10">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-2xl text-navy tracking-tight">{vendor.name}</h3>
                  </div>
                  <div className="flex items-center gap-2 mb-6 text-navy/50 text-sm font-medium">
                    <span className="bg-gold/10 text-gold px-2.5 py-1 rounded text-[10px] uppercase font-bold tracking-widest">{vendor.category}</span>
                    <span className="w-1 h-1 bg-navy/10 rounded-full"></span>
                    <span>📍 {vendor.location}</span>
                  </div>
                  <div className="flex justify-between items-center pt-8 border-t border-navy/5">
                    <div>
                      <p className="text-[9px] text-navy/30 uppercase font-bold tracking-[0.15em] mb-1">Indicative Pricing</p>
                      <p className="font-bold text-navy text-lg">{vendor.priceRange.split(' - ')[0]}</p>
                    </div>
                    <button className="bg-navy text-white w-14 h-14 rounded-2xl flex items-center justify-center hover:bg-gold transition-all shadow-lg group-hover:rotate-6">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-20">
            <button onClick={onExplore} className="px-10 py-4 border-2 border-navy text-navy rounded-full font-bold hover:bg-navy hover:text-white transition-all shadow-xl">Browse All 5,000+ Vendors</button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-champagne relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <h2 className="font-display text-5xl md:text-7xl font-bold text-navy mb-8 leading-tight">Start Your Journey. <br/><span className="italic font-normal serif text-4xl md:text-6xl">Plan Effortlessly.</span></h2>
          <p className="text-xl text-navy/70 mb-12 max-w-2xl mx-auto leading-relaxed">Join 12,000+ hosts who turned their vision into reality with our premium planning tools.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => onStartPlanning()}
              className="bg-navy text-white px-12 py-5 rounded-full font-bold shadow-2xl hover:bg-navy/90 hover:-translate-y-1 transition-all active:scale-95"
            >
              Plan Your Occasion
            </button>
            <button 
              onClick={onPartnerWithUs}
              className="bg-white/50 backdrop-blur-sm text-navy px-12 py-5 rounded-full font-bold border border-navy/10 hover:bg-white transition-all shadow-lg"
            >
              Partner with Us
            </button>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-peach/30 rounded-full blur-[120px] -mr-[20rem] -mt-[20rem]"></div>
        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-gold/20 rounded-full blur-[120px] -ml-[20rem] -mb-[20rem]"></div>
      </section>
    </div>
  );
};

export default LandingPage;
