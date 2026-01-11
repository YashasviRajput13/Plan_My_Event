
import React from 'react';

interface LoginProps {
  onLogin: (role: 'user' | 'vendor') => void;
  onCancel: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onCancel }) => {
  return (
    <div className="min-h-screen bg-[#FFFFF0] flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Abstract Background Accents */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-navy/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-lg relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="font-display text-6xl md:text-7xl font-bold text-navy mb-6 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-navy/50 font-medium text-lg md:text-xl max-w-xs mx-auto leading-relaxed">
            Select your account type to access your personalized event space.
          </p>
        </div>

        {/* Account Type Selection */}
        <div className="space-y-8">
          {/* Planner Card */}
          <button 
            onClick={() => onLogin('user')}
            className="group w-full bg-white p-10 rounded-[3rem] border border-gold/10 hover:border-navy hover:shadow-[0_32px_64px_-15px_rgba(0,0,51,0.12)] transition-all duration-700 text-left flex items-center gap-8 relative overflow-hidden animate-fade-in-up stagger-delay-1"
          >
            <div className="w-20 h-20 bg-ivory rounded-3xl flex items-center justify-center text-4xl shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shrink-0">
              🗓️
            </div>
            <div className="flex-1">
              <h3 className="font-display text-3xl font-bold text-navy mb-2 transition-colors">
                I am a Planner
              </h3>
              <p className="text-navy/40 font-medium leading-relaxed group-hover:text-navy/60 transition-colors">
                Book premium vendors, track your budgets, and manage checklists.
              </p>
            </div>
            {/* Action Arrow */}
            <div className="w-12 h-12 rounded-full bg-ivory flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0 shrink-0">
               <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/>
               </svg>
            </div>
          </button>

          {/* Vendor Card */}
          <button 
            onClick={() => onLogin('vendor')}
            className="group w-full bg-white p-10 rounded-[3rem] border border-gold/10 hover:border-navy hover:shadow-[0_32px_64px_-15px_rgba(0,0,51,0.12)] transition-all duration-700 text-left flex items-center gap-8 relative overflow-hidden animate-fade-in-up stagger-delay-2"
          >
            <div className="w-20 h-20 bg-ivory rounded-3xl flex items-center justify-center text-4xl shadow-sm group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shrink-0">
              🏢
            </div>
            <div className="flex-1">
              <h3 className="font-display text-3xl font-bold text-navy mb-2 transition-colors">
                I am a Vendor
              </h3>
              <p className="text-navy/40 font-medium leading-relaxed group-hover:text-navy/60 transition-colors">
                Grow your brand, manage exclusive leads, and view performance.
              </p>
            </div>
            {/* Action Arrow */}
            <div className="w-12 h-12 rounded-full bg-ivory flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0 shrink-0">
               <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/>
               </svg>
            </div>
          </button>
        </div>

        {/* Footer Navigation */}
        <div className="mt-20 text-center animate-fade-in-up stagger-delay-3">
          <button 
            onClick={onCancel}
            className="inline-flex flex-col items-center gap-3 group"
          >
            <span className="text-navy font-bold text-xs uppercase tracking-[0.4em] group-hover:text-gold transition-colors">
              Back to Home
            </span>
            <div className="h-[2px] w-8 bg-gold/30 rounded-full group-hover:w-16 group-hover:bg-gold transition-all duration-500"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
