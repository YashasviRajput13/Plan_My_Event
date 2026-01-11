
import React, { useState } from 'react';
import { EVENT_TYPES, CITIES } from '../constants';
import { generateEventStrategy } from '../services/geminiService';

interface PlannerWizardProps {
  initialData?: { type: string, city: string };
  onComplete: (data: any) => void;
  onCancel: () => void;
}

const PlannerWizard: React.FC<PlannerWizardProps> = ({ initialData, onComplete, onCancel }) => {
  const [step, setStep] = useState(initialData ? 2 : 1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: initialData?.type || 'Wedding',
    city: initialData?.city || 'Mumbai',
    budget: 500000,
    date: '',
    guestCount: 100,
    vision: ''
  });

  const handleNext = async () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      setLoading(true);
      const strategy = await generateEventStrategy(formData.type, formData.city, formData.budget, formData.vision);
      onComplete({ ...formData, strategy });
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 bg-ivory">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
        {loading && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur z-50 flex flex-col items-center justify-center text-center p-8">
            <div className="w-16 h-16 border-4 border-gold border-t-navy rounded-full animate-spin mb-6"></div>
            <h3 className="font-display text-2xl font-bold text-navy mb-2">Architecting Your Event...</h3>
            <p className="text-navy/60 italic">"Our OS is optimizing your budget, analyzing local risks, and finding top-tier vendors."</p>
          </div>
        )}

        <div className="flex gap-2 mb-12">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={`h-1.5 flex-1 rounded-full ${s <= step ? 'bg-navy' : 'bg-navy/10'}`}></div>
          ))}
        </div>

        {step === 1 && (
          <div className="animate-fade-in-up">
            <h2 className="font-display text-4xl font-bold text-navy mb-2">What's the occasion?</h2>
            <p className="text-navy/50 mb-10">We tailor every detail based on your event type.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {EVENT_TYPES.map(type => (
                <button
                  key={type}
                  onClick={() => setFormData({ ...formData, type })}
                  className={`p-6 rounded-2xl border-2 text-left transition-all ${
                    formData.type === type ? 'border-navy bg-navy text-white shadow-lg' : 'border-gold/20 hover:border-gold'
                  }`}
                >
                  <span className="font-bold text-lg">{type}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in-up">
            <h2 className="font-display text-4xl font-bold text-navy mb-2">Your Vision</h2>
            <p className="text-navy/50 mb-10">Briefly describe the vibe (e.g., "Minimalist royal wedding with lots of flowers" or "High-tech corporate gala").</p>
            <textarea 
              className="w-full p-6 h-40 rounded-2xl border border-gold/20 bg-ivory text-navy font-medium focus:outline-navy resize-none"
              placeholder="Tell our AI about your dream event..."
              value={formData.vision}
              onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
            />
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in-up">
            <h2 className="font-display text-4xl font-bold text-navy mb-2">Where and When?</h2>
            <p className="text-navy/50 mb-10">Select your city and tentative date.</p>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-navy/40 mb-2">Select City</label>
                <select 
                  className="w-full p-4 rounded-xl border border-gold/20 bg-ivory text-navy font-bold focus:outline-navy"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                >
                  {CITIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-navy/40 mb-2">Select Date</label>
                <input 
                  type="date"
                  className="w-full p-4 rounded-xl border border-gold/20 bg-ivory text-navy font-bold focus:outline-navy"
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-fade-in-up">
            <h2 className="font-display text-4xl font-bold text-navy mb-2">Financial Scale</h2>
            <p className="text-navy/50 mb-10">Tell us your budget and guest estimate.</p>
            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-4">
                  <label className="block text-xs font-bold uppercase tracking-widest text-navy/40">Estimated Budget</label>
                  <span className="font-bold text-navy">₹{formData.budget.toLocaleString()}</span>
                </div>
                <input 
                  type="range"
                  min="50000"
                  max="10000000"
                  step="50000"
                  className="w-full h-2 bg-navy/10 rounded-lg appearance-none cursor-pointer accent-navy"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-navy/40 mb-2">Number of Guests</label>
                <input 
                  type="number"
                  placeholder="e.g. 200"
                  className="w-full p-4 rounded-xl border border-gold/20 bg-ivory text-navy font-bold focus:outline-navy"
                  onChange={(e) => setFormData({ ...formData, guestCount: parseInt(e.target.value) })}
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-12 pt-8 border-t border-gold/10">
          <button 
            onClick={step === 1 ? onCancel : () => setStep(step - 1)}
            className="text-navy/50 font-bold hover:text-navy transition-colors"
          >
            {step === 1 ? 'Cancel' : 'Go Back'}
          </button>
          <button 
            onClick={handleNext}
            className="px-10 py-4 bg-navy text-white rounded-full font-bold shadow-xl hover:-translate-y-1 transition-all"
          >
            {step === 4 ? 'Deploy AI Planner' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlannerWizard;
