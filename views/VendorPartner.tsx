
import React from 'react';

interface VendorPartnerProps {
  onJoin: () => void;
}

const VendorPartner: React.FC<VendorPartnerProps> = ({ onJoin }) => {
  return (
    <div className="animate-fade-in-up">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover scale-105 brightness-[0.4]"
            alt="Event Stage"
          />
          <div className="absolute inset-0 bg-navy/60"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
          <div className="inline-block mb-6 px-4 py-1.5 bg-champagne/20 backdrop-blur-md rounded-full border border-champagne/30">
            <span className="text-champagne text-[10px] font-bold uppercase tracking-[0.3em]">Vendor Partnership Program</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Grow Your Business <br />
            <span className="text-champagne italic serif font-normal text-4xl md:text-6xl">with India's Premium Network.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Reach thousands of verified clients, manage bookings effortlessly, and scale your brand with PlanMyEvent.
          </p>
          <button 
            onClick={onJoin}
            className="bg-champagne text-navy px-12 py-5 rounded-full font-bold shadow-2xl hover:bg-white transition-all transform hover:-translate-y-1 active:scale-95"
          >
            Start Your Free Trial
          </button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 bg-white" id="benefits-section">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-24">
            <h2 className="font-display text-5xl font-bold text-navy mb-6">Why Partner <span className="text-gold italic font-normal">with us?</span></h2>
            <p className="text-navy/50 text-lg max-w-2xl mx-auto">We provide the tools and exposure you need to dominate the Indian event market.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: 'High-Intent Leads',
                desc: 'Our AI matches you with clients who fit your price range, location, and service quality perfectly.',
                icon: '🎯'
              },
              {
                title: 'Smart Analytics',
                desc: 'Track your profile views, booking conversion rates, and revenue growth with our custom dashboard.',
                icon: '📊'
              },
              {
                title: 'Secure Payments',
                desc: 'Get your 20% advance instantly through our platform. No more chasing clients for initial deposits.',
                icon: '🛡️'
              },
              {
                title: 'Brand Authority',
                desc: 'Our "Verified" badge builds instant trust, increasing your booking chances by up to 3x.',
                icon: '🌟'
              },
              {
                title: 'Seamless Calendar',
                desc: 'Manage your availability in real-time. Clients can only inquire when you are actually free.',
                icon: '📅'
              },
              {
                title: 'Direct Chat',
                desc: 'Communicate directly with clients through our integrated secure messaging system.',
                icon: '💬'
              }
            ].map((benefit, idx) => (
              <div key={idx} className="p-10 rounded-[2.5rem] bg-ivory/30 border border-gold/5 hover:border-gold/20 hover:shadow-[0_20px_50px_rgba(212,175,55,0.08)] transition-all duration-500 group">
                <span className="text-4xl mb-6 block group-hover:scale-110 transition-transform">{benefit.icon}</span>
                <h3 className="font-bold text-2xl text-navy mb-4">{benefit.title}</h3>
                <p className="text-navy/60 leading-relaxed font-light">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 bg-[#FFFAF0]" id="pricing-section">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="font-display text-5xl font-bold text-navy mb-4">Subscription <span className="text-gold italic font-normal">Plans</span></h2>
            <p className="text-navy/50 text-lg">Choose the right tier to accelerate your business growth.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="bg-white p-12 rounded-[3rem] border border-gold/10 shadow-sm flex flex-col h-full">
              <div className="mb-8">
                <h3 className="font-bold text-navy text-2xl mb-2">Essential</h3>
                <p className="text-navy/40 text-sm">Perfect for new businesses</p>
              </div>
              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-navy">₹0</span>
                <span className="text-navy/40 text-sm">/month</span>
              </div>
              <ul className="space-y-4 mb-12 flex-grow">
                {['Basic Listing', 'Limited Inquiries', '5 Portfolio Images', 'Verified Badge (after review)'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-navy/70 text-sm">
                    <span className="text-gold">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button onClick={onJoin} className="w-full py-4 rounded-full border-2 border-navy text-navy font-bold hover:bg-navy hover:text-white transition-all">List Now</button>
            </div>

            {/* Pro Plan */}
            <div className="bg-navy p-12 rounded-[3rem] shadow-2xl flex flex-col h-full transform scale-105 border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gold text-navy text-[10px] font-bold px-6 py-2 uppercase tracking-widest -rotate-0 rounded-bl-3xl">Most Popular</div>
              <div className="mb-8">
                <h3 className="font-bold text-champagne text-2xl mb-2">Pro Partner</h3>
                <p className="text-white/40 text-sm">Our most effective plan</p>
              </div>
              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">₹2,499</span>
                <span className="text-white/40 text-sm">/month</span>
              </div>
              <ul className="space-y-4 mb-12 flex-grow">
                {['Priority Listing in Search', 'Unlimited Inquiries', '20 Portfolio Images', 'Direct Chat with Clients', 'Monthly Analytics Report'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-white/80 text-sm">
                    <span className="text-champagne">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button onClick={onJoin} className="w-full py-4 rounded-full bg-champagne text-navy font-bold hover:bg-white transition-all shadow-xl">Start Pro Trial</button>
            </div>

            {/* Featured Plan */}
            <div className="bg-white p-12 rounded-[3rem] border border-gold/10 shadow-sm flex flex-col h-full">
              <div className="mb-8">
                <h3 className="font-bold text-navy text-2xl mb-2">Elite Featured</h3>
                <p className="text-navy/40 text-sm">For the top 1% agencies</p>
              </div>
              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-navy">₹5,999</span>
                <span className="text-navy/40 text-sm">/month</span>
              </div>
              <ul className="space-y-4 mb-12 flex-grow">
                {['Home Page Spotlight', 'Featured Vendor Badge', 'Unlimited Portfolio Images', 'Dedicated Relationship Manager', 'Social Media Shoutouts'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-navy/70 text-sm">
                    <span className="text-gold">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button onClick={onJoin} className="w-full py-4 rounded-full border-2 border-gold text-gold font-bold hover:bg-gold hover:text-white transition-all">Go Elite</button>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Trust Section */}
      <section className="py-32 bg-navy text-white overflow-hidden relative">
         <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-12">Ready to redefine <br/><span className="text-champagne italic serif font-normal">your legacy?</span></h2>
            <p className="text-xl text-white/60 mb-16 max-w-2xl mx-auto font-light">Join over 5,000+ businesses who have already scaled their operations through PlanMyEvent.</p>
            <div className="flex justify-center gap-8 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all">
              {['Vogue Weddings', 'ShaadiSaga', 'EventFAQS', 'EEMA'].map(brand => (
                <span key={brand} className="text-xl font-display font-bold">{brand}</span>
              ))}
            </div>
         </div>
         {/* Decorative elements */}
         <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gold/10 rounded-full blur-[150px] -mr-[20rem] -mt-[20rem]"></div>
      </section>
    </div>
  );
};

export default VendorPartner;
