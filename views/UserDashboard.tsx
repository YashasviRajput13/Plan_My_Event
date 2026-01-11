
import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { MOCK_VENDORS } from '../constants';
import { getAIAdvice, getTaskHelper } from '../services/geminiService';

interface UserDashboardProps {
  eventData: {
    type: string;
    city: string;
    budget: number;
    date: string;
    vision: string;
    strategy?: {
      checklist: any[];
      budgetAllocation: any[];
      risks: any[];
      tips: string[];
    };
  };
  onAdjustBudget: () => void;
  onExploreVendors: () => void;
}

const COLORS = ['#000033', '#D4AF37', '#F7E7CE', '#FFDAB9', '#1a1a1a'];

const UserDashboard: React.FC<UserDashboardProps> = ({ eventData, onAdjustBudget, onExploreVendors }) => {
  const [checklist, setChecklist] = useState(eventData.strategy?.checklist || []);
  const [activeAdvice, setActiveAdvice] = useState<string | null>(null);
  const [isAdviceLoading, setIsAdviceLoading] = useState(false);

  const toggleTask = (index: number) => {
    const newChecklist = [...checklist];
    newChecklist[index].completed = !newChecklist[index].completed;
    setChecklist(newChecklist);
  };

  const completedCount = checklist.filter(c => c.completed).length;
  const progress = (completedCount / checklist.length) * 100;

  const handleAIDiagnostics = async () => {
    setIsAdviceLoading(true);
    const advice = await getAIAdvice(`Generate a quick status report for a ${eventData.type} in ${eventData.city} with ₹${eventData.budget} budget. Current progress: ${Math.round(progress)}%. Vision: ${eventData.vision}`);
    setActiveAdvice(advice || "Your event is on track! Continue following the checklist.");
    setIsAdviceLoading(false);
  };

  const handleTaskHelp = async (task: string) => {
    setIsAdviceLoading(true);
    const help = await getTaskHelper(task, eventData.city);
    setActiveAdvice(help || "Consult with local experts to finalize this task.");
    setIsAdviceLoading(false);
  };

  const handleRiskDeepDive = async (risk: any) => {
    setIsAdviceLoading(true);
    const deepDive = await getAIAdvice(`Explain mitigation for this risk in ${eventData.city}: ${risk.risk}. Impact is ${risk.impact}.`);
    setActiveAdvice(deepDive || "Consider moving this task earlier in your timeline.");
    setIsAdviceLoading(false);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 bg-ivory">
      {/* AI Advice Overlay */}
      {activeAdvice && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-navy/40 backdrop-blur-md">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-lg w-full shadow-2xl animate-fade-in-up border border-gold/20">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🤖</span>
                <h3 className="font-display text-2xl font-bold text-navy">AI Intelligence</h3>
              </div>
              <button onClick={() => setActiveAdvice(null)} className="text-navy/40 hover:text-navy text-2xl">✕</button>
            </div>
            <div className="prose prose-sm text-navy/70 mb-8 whitespace-pre-wrap leading-relaxed">
              {activeAdvice}
            </div>
            <button 
              onClick={() => setActiveAdvice(null)}
              className="w-full py-4 bg-navy text-white rounded-2xl font-bold shadow-xl hover:bg-gold hover:text-navy transition-all"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header: AI Status */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gold/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6">
             <button 
                onClick={handleAIDiagnostics}
                disabled={isAdviceLoading}
                className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-xs font-bold uppercase tracking-widest border border-green-200 hover:bg-green-100 transition-colors group"
             >
               <span className={`w-2 h-2 bg-green-500 rounded-full ${isAdviceLoading ? 'animate-ping' : ''}`}></span>
               {isAdviceLoading ? 'Analyzing...' : 'AI Diagnostics Active'}
               <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
             </button>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="flex-1">
              <p className="text-xs uppercase font-bold tracking-[0.3em] text-gold mb-2">Event Operating System</p>
              <h1 className="font-display text-5xl md:text-6xl font-bold text-navy mb-4 leading-tight">
                {eventData.type} <span className="text-gold italic font-normal">in {eventData.city}</span>
              </h1>
              <p className="text-navy/50 font-medium text-lg italic max-w-2xl">"{eventData.vision}"</p>
            </div>
            <div className="flex gap-4">
              <div className="bg-navy text-white px-8 py-6 rounded-3xl text-center min-w-[180px]">
                <p className="text-[10px] uppercase font-bold tracking-widest opacity-60 mb-1">AI Budget Guard</p>
                <p className="font-bold text-2xl">₹{eventData.budget.toLocaleString()}</p>
                <button onClick={onAdjustBudget} className="text-[10px] font-bold text-gold underline mt-2 block w-full">Optimize Scale</button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Planning Track */}
          <div className="lg:col-span-8 space-y-8">
            {/* Checklist Section */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gold/10">
              <div className="flex justify-between items-end mb-10">
                <div>
                  <h2 className="font-display text-3xl font-bold text-navy mb-2">Execution Pipeline</h2>
                  <p className="text-navy/40">AI-suggested timeline based on local logistics.</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold text-navy">{Math.round(progress)}%</span>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-navy/40">Ready for Launch</p>
                </div>
              </div>
              <div className="h-2 bg-navy/5 rounded-full overflow-hidden mb-12">
                <div className="h-full bg-gold transition-all duration-1000" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="space-y-4">
                {checklist.map((item, idx) => (
                  <div key={idx} className={`group flex items-center gap-6 p-6 rounded-2xl border-2 transition-all ${item.completed ? 'bg-navy/5 border-transparent opacity-60' : 'bg-white border-gold/5 hover:border-gold/20 shadow-sm'}`}>
                    <button onClick={() => toggleTask(idx)} className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center shrink-0 transition-all ${item.completed ? 'bg-navy border-navy text-white' : 'border-gold/20 hover:border-gold'}`}>
                      {item.completed && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>}
                    </button>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className={`font-bold text-lg text-navy ${item.completed ? 'line-through' : ''}`}>{item.task}</h4>
                        <button 
                          onClick={() => handleTaskHelp(item.task)}
                          className="text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-gold/10 text-gold hover:bg-gold hover:text-navy transition-all"
                        >
                          Ask AI Expert
                        </button>
                      </div>
                      <div className="flex gap-4 mt-2 text-xs text-navy/40 font-medium">
                        <span className="flex items-center gap-1.5"><span className="text-gold opacity-100">🕒</span> {item.timeline}</span>
                        <span className="flex items-center gap-1.5"><span className="text-gold opacity-100">📍</span> {item.category}</span>
                        <span className={`ml-auto text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${item.priority === 'High' ? 'bg-red-50 text-red-600' : 'bg-navy/5 text-navy/60'}`}>{item.priority}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Risk Predictor */}
            <div className="bg-navy text-ivory rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[80px] -mr-32 -mt-32"></div>
               <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-2xl">🛡️</div>
                  <div>
                    <h3 className="font-display text-3xl font-bold">Risk Prediction Engine</h3>
                    <p className="text-white/40">Real-time analysis of local constraints. Click for deep-dive.</p>
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {eventData.strategy?.risks.map((risk, idx) => (
                   <div 
                    key={idx} 
                    onClick={() => handleRiskDeepDive(risk)}
                    className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer group"
                   >
                      <div className="flex justify-between mb-4">
                        <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded ${risk.likelihood === 'High' ? 'bg-red-500 text-white' : 'bg-white/20'}`}>{risk.likelihood} Threat</span>
                      </div>
                      <h4 className="font-bold text-champagne mb-2 group-hover:text-gold transition-colors">{risk.risk}</h4>
                      <p className="text-xs text-white/60 mb-4 leading-relaxed line-clamp-2">{risk.impact}</p>
                      <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                        <p className="text-[9px] font-bold uppercase text-gold tracking-widest">Plan B Strategy</p>
                        <span className="text-[10px] text-white/40 opacity-0 group-hover:opacity-100 transition-opacity">Analyze →</span>
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>

          {/* AI Intelligence Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Budget Optimizer */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gold/10">
              <h3 className="font-display text-2xl font-bold text-navy mb-2">Smart Budgeting</h3>
              <p className="text-navy/40 text-sm mb-8">AI-optimized allocation. Click segments to see vendors.</p>
              <div className="h-[250px] w-full mb-8">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={eventData.strategy?.budgetAllocation}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="amount"
                      onClick={(data) => {
                        handleAIDiagnostics(); // Or show filtered vendors
                      }}
                    >
                      {eventData.strategy?.budgetAllocation.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="cursor-pointer hover:opacity-80 transition-opacity" />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                      formatter={(value: number) => `₹${value.toLocaleString()}`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                 {eventData.strategy?.budgetAllocation.map((item: any, idx: number) => (
                   <div key={idx} className="flex justify-between items-center p-3 rounded-xl hover:bg-ivory transition-all cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                        <span className="text-sm font-bold text-navy group-hover:text-gold transition-colors">{item.label}</span>
                      </div>
                      <span className="text-sm font-medium text-navy/50">₹{item.amount.toLocaleString()}</span>
                   </div>
                 ))}
              </div>
            </div>

            {/* Smart Insights */}
            <div className="bg-champagne rounded-[2.5rem] p-10 border border-gold/20">
              <div className="flex items-center gap-3 mb-6 text-navy">
                <span className="text-2xl">💡</span>
                <h3 className="font-display text-2xl font-bold">OS Intelligence</h3>
              </div>
              <ul className="space-y-6">
                {eventData.strategy?.tips.map((tip, idx) => (
                  <li key={idx} className="flex gap-4 group cursor-pointer" onClick={() => handleAIDiagnostics()}>
                    <span className="text-gold font-bold">{idx + 1}.</span>
                    <p className="text-sm text-navy/70 leading-relaxed font-medium group-hover:text-navy transition-colors">{tip}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust-Verified Vendors */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gold/10">
               <h3 className="font-display text-2xl font-bold text-navy mb-6">Top-Trust Matches</h3>
               <div className="space-y-6">
                 {MOCK_VENDORS.slice(0, 4).map(v => (
                   <div key={v.id} onClick={onExploreVendors} className="group cursor-pointer flex gap-4 p-3 rounded-2xl hover:bg-ivory transition-all relative">
                      <div className="relative">
                        <img src={v.image} className="w-20 h-20 rounded-2xl object-cover" alt={v.name} />
                        <div className="absolute -top-2 -right-2 bg-navy text-gold text-[8px] font-bold px-1.5 py-0.5 rounded shadow-xl border border-gold/30">
                          {v.trustScore}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-navy truncate group-hover:text-gold transition-colors">{v.name}</h4>
                        <p className="text-[10px] text-navy/40 font-bold uppercase tracking-widest">{v.category}</p>
                        <div className="flex items-center gap-2 mt-2">
                           <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">Verified Pricing</span>
                           <span className="text-[10px] text-navy/30">Rel. {v.reliabilityPercent}%</span>
                        </div>
                      </div>
                   </div>
                 ))}
                 <button 
                  onClick={onExploreVendors}
                  className="w-full py-4 rounded-2xl border-2 border-gold/20 text-navy font-bold hover:bg-navy hover:text-white hover:border-navy transition-all mt-4 text-sm"
                 >
                   Explore Full Network
                 </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
