
import React, { useState, useMemo } from 'react';
import { MOCK_VENDORS, CITIES, SERVICE_CATEGORIES } from '../constants';
import { Vendor } from '../types';
import { getAIAdvice } from '../services/geminiService';

interface SearchResultsProps {
  initialCity?: string;
  initialCategory?: string;
  onBook: (vendor: Vendor) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ initialCity, initialCategory, onBook }) => {
  const [city, setCity] = useState(initialCity || '');
  const [category, setCategory] = useState(initialCategory || '');
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalysing, setIsAnalysing] = useState(false);

  const filteredVendors = useMemo(() => {
    return MOCK_VENDORS.filter(v => {
      const matchCity = !city || v.location === city;
      const matchCat = !category || v.category.toLowerCase().includes(category.toLowerCase());
      return matchCity && matchCat;
    });
  }, [city, category]);

  const handleAIScout = async () => {
    setIsAnalysing(true);
    const context = `The user is looking for ${category || 'any'} vendors in ${city || 'India'}. Based on our network of ${filteredVendors.length} vendors, recommend what they should look for (quality, price points, and verified trust).`;
    const advice = await getAIAdvice(context);
    setAiAnalysis(advice || "Look for vendors with high trust scores and verified pricing tags.");
    setIsAnalysing(false);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 bg-ivory">
      {/* AI Analysis Modal */}
      {aiAnalysis && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-navy/40 backdrop-blur-md">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-lg w-full shadow-2xl animate-fade-in-up border border-gold/20">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🕵️‍♂️</span>
                <h3 className="font-display text-2xl font-bold text-navy">AI Scout Report</h3>
              </div>
              <button onClick={() => setAiAnalysis(null)} className="text-navy/40 hover:text-navy text-2xl">✕</button>
            </div>
            <p className="text-navy/70 mb-8 leading-relaxed font-medium">
              {aiAnalysis}
            </p>
            <button 
              onClick={() => setAiAnalysis(null)}
              className="w-full py-4 bg-navy text-white rounded-2xl font-bold shadow-xl hover:bg-gold hover:text-navy transition-all"
            >
              Got it, Scout
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="font-display text-5xl font-bold text-navy mb-2">Vendor Network</h1>
            <p className="text-navy/50 font-medium">Discover {filteredVendors.length} premium partners in our network.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <button 
              onClick={handleAIScout}
              disabled={isAnalysing}
              className="px-6 py-3 bg-gold text-navy rounded-2xl text-xs font-bold uppercase tracking-widest shadow-lg hover:bg-navy hover:text-white transition-all flex items-center gap-2 group disabled:opacity-50"
            >
              <span className={isAnalysing ? 'animate-spin' : 'group-hover:animate-bounce'}>✨</span>
              {isAnalysing ? 'Scouting...' : 'AI Recommendations'}
            </button>

            <div className="flex flex-wrap gap-4 bg-white p-2 rounded-[2rem] shadow-sm border border-gold/10">
              <select 
                value={city} 
                onChange={(e) => setCity(e.target.value)}
                className="bg-transparent border-none text-navy text-sm font-bold focus:ring-0 px-4"
              >
                <option value="">All Cities</option>
                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <div className="w-px h-6 bg-gold/20 self-center hidden md:block"></div>
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                className="bg-transparent border-none text-navy text-sm font-bold focus:ring-0 px-4"
              >
                <option value="">All Categories</option>
                {SERVICE_CATEGORIES.map(c => <option key={c.id} value={c.label}>{c.label}</option>)}
                <option value="Banquet">BANQUET</option>
              </select>
            </div>
          </div>
        </div>

        {filteredVendors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVendors.map(vendor => (
              <div key={vendor.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group border border-gold/5 flex flex-col">
                <div className="h-64 relative overflow-hidden">
                  <img src={vendor.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={vendor.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent"></div>
                  {vendor.featured && (
                    <span className="absolute top-6 left-6 bg-gold text-navy text-[9px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">Featured</span>
                  )}
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-2 py-1 rounded-lg border border-white/20">
                      <span className="text-gold text-xs">★</span>
                      <span className="text-xs font-bold">{vendor.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="mb-4">
                    <h3 className="font-display text-2xl font-bold text-navy group-hover:text-gold transition-colors">{vendor.name}</h3>
                    <p className="text-[10px] text-navy/40 font-bold uppercase tracking-widest mt-1">{vendor.category} • {vendor.location}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-4 bg-ivory/50 rounded-2xl">
                      <p className="text-[8px] text-navy/30 uppercase font-bold tracking-widest mb-1">Trust Score</p>
                      <p className="font-bold text-navy">{vendor.trustScore}/100</p>
                    </div>
                    <div className="p-4 bg-ivory/50 rounded-2xl">
                      <p className="text-[8px] text-navy/30 uppercase font-bold tracking-widest mb-1">Price Info</p>
                      <p className="font-bold text-green-600 text-xs">{vendor.priceTransparency}</p>
                    </div>
                  </div>
                  <div className="mt-auto pt-6 border-t border-navy/5 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-navy/30 uppercase font-bold tracking-widest mb-1">From</p>
                      <p className="font-bold text-navy text-lg">{vendor.priceRange.split(' - ')[0]}</p>
                    </div>
                    <button 
                      onClick={() => onBook(vendor)}
                      className="px-6 py-3 bg-navy text-white rounded-xl text-xs font-bold hover:bg-gold hover:text-navy transition-all shadow-lg"
                    >
                      Check Availability
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-40">
            <div className="text-6xl mb-6">🏜️</div>
            <h2 className="font-display text-3xl font-bold text-navy mb-4">No Vendors Found</h2>
            <p className="text-navy/50 max-w-md mx-auto mb-8">Try adjusting your filters to find the perfect partner for your event.</p>
            <button onClick={() => { setCity(''); setCategory(''); }} className="px-8 py-3 bg-navy text-white rounded-full font-bold">Clear All Filters</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
