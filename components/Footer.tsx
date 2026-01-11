
import React from 'react';
import { AppState } from '../types';

interface FooterProps {
  onNavigate: (view: AppState['view']) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-navy text-white py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="col-span-1">
          <div 
            className="flex flex-col gap-1 mb-8 cursor-pointer group"
            onClick={() => onNavigate('landing')}
          >
            <div className="flex items-baseline">
              <span className="font-display text-3xl font-bold tracking-tight text-white group-hover:text-champagne transition-colors">PlanMy</span>
              <span className="font-sans text-3xl font-semibold tracking-tight text-[#D58C8C] group-hover:text-white transition-colors">Event</span>
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">Your Occasion. Our Plan.</p>
          </div>
          <p className="text-white/70 text-sm leading-relaxed mb-8 max-w-xs">
            Simplifying event planning for the modern Indian family and professional. Transparency, quality, and trust in every booking.
          </p>
          <div className="flex gap-4">
            {['FB', 'IG', 'TW', 'LI'].map(s => (
              <div key={s} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold hover:bg-white hover:text-navy cursor-pointer transition-all border border-white/5">
                {s}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-white mb-8 uppercase tracking-[0.2em] text-[10px]">For Users</h4>
          <ul className="space-y-4 text-sm">
            <li><button onClick={() => onNavigate('landing')} className="text-white/60 hover:text-white transition-colors">Browse Vendors</button></li>
            <li><button onClick={() => onNavigate('wizard')} className="text-white/60 hover:text-white transition-colors">Budget Planner</button></li>
            <li><button onClick={() => onNavigate('dashboard')} className="text-white/60 hover:text-white transition-colors">AI Checklist</button></li>
            <li><button onClick={() => onNavigate('wizard')} className="text-white/60 hover:text-white transition-colors">Event Wizard</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-8 uppercase tracking-[0.2em] text-[10px]">For Vendors</h4>
          <ul className="space-y-4 text-sm">
            <li><button onClick={() => onNavigate('vendor-partner')} className="text-white/60 hover:text-white transition-colors">List Business</button></li>
            <li><button onClick={() => onNavigate('vendor-partner')} className="text-white/60 hover:text-white transition-colors">Subscription Plans</button></li>
            <li><button onClick={() => onNavigate('vendor-dashboard')} className="text-white/60 hover:text-white transition-colors">Vendor Dashboard</button></li>
            <li><button onClick={() => onNavigate('vendor-partner')} className="text-white/60 hover:text-white transition-colors">Lead Generation</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-8 uppercase tracking-[0.2em] text-[10px]">Company</h4>
          <ul className="space-y-4 text-sm">
            <li><button onClick={() => onNavigate('landing')} className="text-white/60 hover:text-white transition-colors">About Us</button></li>
            <li><button onClick={() => onNavigate('landing')} className="text-white/60 hover:text-white transition-colors">Careers</button></li>
            <li><button onClick={() => onNavigate('vendor-partner')} className="text-white/60 hover:text-white transition-colors">Partner with us</button></li>
            <li><button onClick={() => onNavigate('landing')} className="text-white/60 hover:text-white transition-colors">Privacy Policy</button></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-white/40">
        <p>© {new Date().getFullYear()} PlanMyEvent. All Rights Reserved.</p>
        <div className="flex gap-8">
          <button className="hover:text-white transition-colors">Terms of Service</button>
          <button className="hover:text-white transition-colors">Cookie Policy</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
