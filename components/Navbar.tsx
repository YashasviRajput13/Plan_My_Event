
import React from 'react';

interface NavbarProps {
  onNavigate: (view: any) => void;
  userRole: 'user' | 'vendor' | null;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, userRole }) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gold/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => onNavigate('landing')}
        >
          {/* New High-Fidelity Brand Logo */}
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg viewBox="0 0 100 100" fill="none" xmlns="" className="w-full h-full transition-all duration-500 group-hover:scale-105">
              {/* Main Circular Frame */}
              <circle cx="50" cy="50" r="42" stroke="#000033" strokeWidth="1" className="opacity-20" />
              
              {/* Decorative Swish/Ring */}
              <path d="M15 50C15 30.67 30.67 15 50 15C69.33 15 85 30.67 85 50C85 69.33 69.33 85 50 85" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 4" />
              
              {/* Top Section - Cake & Graduation */}
              <path d="M35 38H45V43H35V38ZM37 36H43V38H37V36ZM38 34H39V36H38V34ZM41 34H42V36H41V34Z" fill="#D17A7A" /> {/* Simplified Cake */}
              <path d="M58 35L70 38L58 41L46 38L58 35Z" fill="#000033" /> {/* Simplified Cap */}
              <path d="M66 38V43" stroke="#000033" strokeWidth="1" />
              
              {/* Center - Interlocking Rings */}
              <circle cx="47" cy="52" r="7" stroke="#D4AF37" strokeWidth="2" />
              <circle cx="56" cy="52" r="7" stroke="#D4AF37" strokeWidth="2" />
              
              {/* Bottom Section - Podium & Calendar */}
              <path d="M35 60H45V72H35V60ZM38 64V68M42 64V68" stroke="#000033" strokeWidth="1.5" /> {/* Podium */}
              <rect x="55" y="60" width="12" height="12" rx="1" fill="#D4AF37" fillOpacity="0.3" stroke="#D4AF37" /> {/* Calendar */}
              
              {/* Central Arrow Shape */}
              <path d="M50 45V30M50 30L46 34M50 30L54 34" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline">
              <span className="font-display text-2xl font-bold tracking-tight text-navy">PlanMy</span>
              <span className="font-sans text-2xl font-semibold tracking-tight text-[#D17A7A]">Event</span>
            </div>
            <span className="text-[8px] uppercase tracking-[0.2em] font-bold text-navy/40 -mt-1">Your Occasion. Our Plan.</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-navy/70">
          <button className="hover:text-navy transition-colors" onClick={() => onNavigate('landing')}>Home</button>
          <button className="hover:text-navy transition-colors" onClick={() => onNavigate('how-it-works')}>How it Works</button>
          <button className="hover:text-navy transition-colors" onClick={() => onNavigate('vendors')}>Vendors</button>
          <button className="hover:text-navy transition-colors" onClick={() => onNavigate('pricing')}>Pricing</button>
        </div>

        <div className="flex items-center gap-4">
          {userRole ? (
            <div className="flex items-center gap-4">
              <button 
                onClick={() => onNavigate(userRole === 'user' ? 'dashboard' : 'vendor-dashboard')}
                className="px-6 py-2.5 bg-navy text-white rounded-full text-sm font-semibold hover:bg-navy/90 transition-all shadow-lg"
              >
                {userRole === 'user' ? 'Dashboard' : 'Vendor Panel'}
              </button>
              <button 
                onClick={() => onNavigate('logout')}
                className="text-navy/40 hover:text-navy text-xs font-bold uppercase tracking-widest transition-colors"
              >
                Log Out
              </button>
            </div>
          ) : (
            <>
              <button 
                onClick={() => onNavigate('vendor-partner')}
                className="text-navy font-semibold text-sm hover:underline hidden sm:block"
              >
                List Your Services
              </button>
              <button 
                onClick={() => onNavigate('login')}
                className="px-6 py-2.5 bg-navy text-white rounded-full text-sm font-semibold hover:bg-navy/90 transition-all shadow-lg"
              >
                Log In
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
