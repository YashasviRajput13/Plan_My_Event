
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { getPricingRecommendation } from '../services/geminiService';

const initialAnalyticsData = [
  { name: 'Jan', leads: 400, bookings: 240, revenue: 120000 },
  { name: 'Feb', leads: 300, bookings: 139, revenue: 98000 },
  { name: 'Mar', leads: 200, bookings: 980, revenue: 450000 },
  { name: 'Apr', leads: 278, bookings: 390, revenue: 210000 },
  { name: 'May', leads: 189, bookings: 480, revenue: 250000 },
  { name: 'Jun', leads: 239, bookings: 380, revenue: 190000 },
];

const initialBookings = [
  { id: 1, name: 'Aditi Sharma', date: '24 Oct 2024', type: 'Wedding', budget: '₹1.5L', status: 'Pending' },
  { id: 2, name: 'Karan Mehra', date: '12 Nov 2024', type: 'Corporate', budget: '₹4.2L', status: 'Confirmed' },
  { id: 3, name: 'Sameer Khan', date: '05 Dec 2024', type: 'Birthday', budget: '₹2.8L', status: 'Payment Received' },
];

const initialDates = [
  { date: '12th Dec 2024', event: 'Wedding Season Peak', status: 'Blocked', price: '1.5x Surge' },
  { date: '25th Dec 2024', event: 'Christmas Special', status: 'Open', price: '1.2x Surge' },
  { date: '31st Dec 2024', event: 'New Year Eve', status: 'Booked', price: '2.0x Surge' },
  { date: '15th Jan 2025', event: 'Pongal / Makar Sankranti', status: 'Open', price: 'Standard' },
];

const initialReviews = [
  { id: 1, name: 'Rahul Varma', rating: 5, date: '2 days ago', text: 'Exceptional service at our corporate gala. The coordination was flawless.', type: 'Corporate', reply: null },
  { id: 2, name: 'Surbhi Gupta', rating: 4, date: '1 week ago', text: 'Great decorations, though the setup took 30 mins longer than expected.', type: 'Wedding', reply: null },
  { id: 3, name: 'Amit Jha', rating: 5, date: '2 weeks ago', text: 'Best vendor in Mumbai for large scale concerts. Highly recommend.', type: 'Concert', reply: null },
];

interface VendorDashboardProps {
  onAction: (action: string) => void;
}

type Tab = 'overview' | 'bookings' | 'operations' | 'finances' | 'reputation';

const VendorDashboard: React.FC<VendorDashboardProps> = ({ onAction }) => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  // States for interactive features
  const [bookings, setBookings] = useState(initialBookings);
  const [availabilityDates, setAvailabilityDates] = useState(initialDates);
  const [reviews, setReviews] = useState(initialReviews);
  const [multiplier, setMultiplier] = useState(1.2);
  const [replyText, setReplyText] = useState<{ [key: number]: string }>({});
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [aiPricingReport, setAiPricingReport] = useState<any>(null);

  const handleBookingAction = (id: number, action: string) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: action } : b));
    onAction(`${action} booking for ${bookings.find(b => b.id === id)?.name}`);
  };

  const toggleAvailability = (index: number) => {
    setAvailabilityDates(prev => {
      const updated = [...prev];
      updated[index].status = updated[index].status === 'Blocked' ? 'Open' : 'Blocked';
      return updated;
    });
    onAction(`Toggled availability for ${availabilityDates[index].date}`);
  };

  const handleReviewReply = (id: number) => {
    if (!replyText[id]) return;
    setReviews(prev => prev.map(r => r.id === id ? { ...r, reply: replyText[id] } : r));
    setReplyText(prev => ({ ...prev, [id]: '' }));
    onAction(`Replied to review by ${reviews.find(r => r.id === id)?.name}`);
  };

  const handleApplyAIPricing = async () => {
    setIsOptimizing(true);
    const totalLeads = initialAnalyticsData.reduce((acc, curr) => acc + curr.leads, 0);
    const totalRevenue = initialAnalyticsData.reduce((acc, curr) => acc + curr.revenue, 0);
    
    try {
      const recommendation = await getPricingRecommendation(totalLeads, totalRevenue, multiplier);
      if (recommendation) {
        setAiPricingReport(recommendation);
        setMultiplier(recommendation.suggestedMultiplier);
        onAction(`AI Optimization complete. New multiplier: ${recommendation.suggestedMultiplier}x`);
      } else {
        onAction("AI Pricing Optimization failed. Network error.");
      }
    } catch (e) {
      onAction("AI Pricing Optimization failed. Network error.");
    } finally {
      setIsOptimizing(false);
    }
  };

  const renderOverview = () => (
    <div className="space-y-8 animate-fade-in-up">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Today's Leads", val: '12', delta: '+3', icon: '🔥', color: 'text-orange-600 bg-orange-50', action: 'Leads' },
          { label: 'Pending Quotes', val: '08', delta: 'Urgent', icon: '⏳', color: 'text-blue-600 bg-blue-50', action: 'Quotes' },
          { label: "Today's Earnings", val: '₹45k', delta: '+15%', icon: '💰', color: 'text-green-600 bg-green-50', action: 'Earnings' },
          { label: 'Response Time', val: '14m', delta: 'Top 5%', icon: '⚡', color: 'text-purple-600 bg-purple-50', action: 'Metrics' },
        ].map(stat => (
          <div 
            key={stat.label} 
            onClick={() => onAction(`Viewing ${stat.action}`)}
            className="bg-white p-6 rounded-3xl border border-gold/10 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-2xl group-hover:scale-110 transition-transform">{stat.icon}</span>
              <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-tighter ${stat.color}`}>{stat.delta}</span>
            </div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-navy/40 mb-1">{stat.label}</p>
            <h3 className="text-3xl font-bold text-navy">{stat.val}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white p-8 rounded-3xl border border-gold/10 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-display text-2xl font-bold text-navy">Revenue & Lead Trends</h3>
            <select className="bg-ivory border-none text-xs font-bold text-navy/50 rounded-lg px-3 py-1.5 focus:ring-0">
              <option>Last 6 Months</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={initialAnalyticsData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#000033" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#000033" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#000033' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#000033' }} />
                <Tooltip contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="revenue" stroke="#000033" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="leads" stroke="#D4AF37" strokeWidth={2} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-navy text-ivory p-8 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <h3 className="font-display text-2xl font-bold mb-6 text-white">Platform Ranking</h3>
            <div className="flex flex-col items-center py-4">
               <div className="relative w-32 h-32 flex items-center justify-center mb-6">
                 <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/10" />
                    <circle cx="64" cy="64" r="58" stroke="#D4AF37" strokeWidth="8" fill="transparent" strokeDasharray="364.4" strokeDashoffset="36.4" strokeLinecap="round" />
                 </svg>
                 <span className="absolute text-3xl font-bold text-white">9.2</span>
               </div>
               <p className="text-xs text-center text-white/80 mb-6">Your response time is 40% faster than competitors in Mumbai.</p>
               <button 
                onClick={() => handleBookingAction(0, 'Boosting Profile')}
                className="w-full py-3 bg-white/10 border border-white/20 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/20 transition-all text-white"
               >
                Boost Ranking
               </button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gold/10 shadow-sm">
             <h4 className="text-xs font-bold text-navy/40 uppercase tracking-widest mb-4">Compliance Status</h4>
             <div className="space-y-4">
                <div className="flex justify-between items-center text-sm font-medium">
                   <span className="text-navy/60">KYC Verification</span>
                   <span className="text-green-600">Verified ✓</span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium">
                   <span className="text-navy/60">GST Invoicing</span>
                   <button onClick={() => onAction('Opening GST Wizard')} className="text-orange-600 underline">Action Required</button>
                </div>
                <div className="flex justify-between items-center text-sm font-medium">
                   <span className="text-navy/60">Bank Account</span>
                   <span className="text-green-600">Linked ✓</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOperations = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in-up">
      <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-gold/10 shadow-sm">
        <h3 className="font-display text-2xl font-bold text-navy mb-6">Availability Control</h3>
        <p className="text-navy/50 text-sm mb-8">Block dates or set special pricing for peak days.</p>
        
        <div className="space-y-4">
          {availabilityDates.map((d, i) => (
            <div key={i} className="flex items-center justify-between p-5 bg-ivory/30 rounded-2xl hover:bg-ivory transition-colors group">
              <div className="flex gap-4 items-center">
                 <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex flex-col items-center justify-center border border-gold/5">
                    <span className="text-[10px] font-bold text-gold uppercase">{d.date.split(' ')[1]}</span>
                    <span className="text-lg font-bold text-navy">{d.date.split(' ')[0]}</span>
                 </div>
                 <div>
                    <h4 className="font-bold text-navy">{d.event}</h4>
                    <p className={`text-xs font-bold ${d.status === 'Blocked' ? 'text-red-500' : 'text-green-600'}`}>Status: {d.status}</p>
                 </div>
              </div>
              <div className="flex items-center gap-6">
                 <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${d.price.includes('Surge') ? 'bg-orange-100 text-orange-600' : 'bg-navy/5 text-navy/40'}`}>
                   {d.price}
                 </span>
                 <button 
                  onClick={() => toggleAvailability(i)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${d.status === 'Blocked' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}
                 >
                   {d.status === 'Blocked' ? 'Unblock' : 'Block'}
                 </button>
              </div>
            </div>
          ))}
        </div>
        <button 
          onClick={() => onAction('Manual Date Picker Opened')}
          className="w-full mt-8 py-4 border-2 border-dashed border-gold/20 rounded-2xl text-navy/40 font-bold hover:text-navy hover:border-gold/40 transition-all"
        >
          + Manually Block Date
        </button>
      </div>

      <div className="lg:col-span-5 bg-navy text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <h3 className="font-display text-2xl font-bold mb-8 text-champagne">Dynamic Pricing Tool</h3>
        <div className="p-6 bg-white/5 rounded-2xl border border-white/10 mb-8">
           <p className="text-xs uppercase font-bold tracking-widest text-champagne mb-6">Global Multiplier</p>
           <div className="flex items-center justify-between mb-8">
              <div className="space-y-1">
                <span className="text-4xl font-bold text-white">{multiplier.toFixed(1)}x</span>
                <p className="text-[10px] text-white/80 font-medium">Active across all open dates</p>
              </div>
              <div className="flex gap-2">
                 <button 
                  onClick={() => setMultiplier(prev => Math.max(1, prev - 0.1))}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all text-xl text-white"
                 >
                   -
                 </button>
                 <button 
                  onClick={() => setMultiplier(prev => Math.min(3, prev + 0.1))}
                  className="w-10 h-10 bg-champagne text-navy rounded-full flex items-center justify-center hover:scale-110 transition-all text-xl"
                 >
                   +
                 </button>
              </div>
           </div>
           
           {aiPricingReport && (
             <div className="mb-6 p-4 bg-white/10 rounded-xl border border-champagne/20 animate-fade-in-up">
                <p className="text-[10px] text-champagne font-bold uppercase mb-2 tracking-widest">AI Strategy Insight</p>
                <p className="text-xs text-white leading-relaxed italic mb-3">"{aiPricingReport.explanation}"</p>
                <div className="pt-2 border-t border-white/10">
                   <p className="text-[10px] text-white/60 font-bold uppercase tracking-tighter">Peak Strategy: <span className="text-white">{aiPricingReport.peakDateStrategy}</span></p>
                </div>
             </div>
           )}

           <div className="space-y-4">
              <p className="text-xs italic text-white/70 font-medium">"Optimizing pricing for current market demand ensures maximum booking yield."</p>
              <button 
                onClick={handleApplyAIPricing}
                disabled={isOptimizing}
                className={`w-full py-4 bg-champagne text-navy rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg transition-all flex items-center justify-center gap-3 active:scale-95 ${isOptimizing ? 'opacity-90' : 'hover:scale-[1.02]'}`}
              >
                {isOptimizing && <div className="w-4 h-4 border-2 border-navy border-t-transparent rounded-full animate-spin"></div>}
                <span className="font-black">{isOptimizing ? 'ANALYZING MARKETS...' : 'APPLY RECOMMENDATIONS'}</span>
              </button>
           </div>
        </div>

        <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
           <div className="flex items-center gap-3 mb-4">
              <span className="text-xl">📅</span>
              <h4 className="font-bold text-white">Google Calendar Sync</h4>
           </div>
           <p className="text-sm text-white/80 mb-6 font-medium">Automatically block dates in PlanMyEvent when you have external bookings.</p>
           <button 
            onClick={() => onAction('OAuth Calendar Sync Initialized')}
            className="w-full py-3 border border-white/30 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all text-white"
           >
             Connect Calendar
           </button>
        </div>
      </div>
    </div>
  );

  const renderFinances = () => (
    <div className="space-y-8 animate-fade-in-up">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-3xl border border-gold/10 shadow-sm">
           <p className="text-[10px] uppercase tracking-widest font-bold text-navy/40 mb-2">Next Payout</p>
           <h3 className="text-4xl font-bold text-navy mb-1">₹42,500</h3>
           <p className="text-xs text-green-600 font-bold mb-6">Expected on 14th Oct</p>
           <button onClick={() => onAction('Viewing Payouts')} className="text-[10px] font-bold text-gold uppercase tracking-widest hover:underline">View Payout History →</button>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-gold/10 shadow-sm">
           <p className="text-[10px] uppercase tracking-widest font-bold text-navy/40 mb-2">Commission Paid (MTD)</p>
           <h3 className="text-4xl font-bold text-navy mb-1">₹4,250</h3>
           <p className="text-xs text-navy/40 font-bold mb-6">Flat 10% platform fee</p>
           <button onClick={() => onAction('Viewing Fee Breakdown')} className="text-[10px] font-bold text-gold uppercase tracking-widest hover:underline">Fee Structure Details →</button>
        </div>
        <div className="bg-navy p-8 rounded-3xl shadow-xl flex flex-col justify-between">
           <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-white mb-2">Total Managed Volume</p>
            <h3 className="text-4xl font-bold text-white mb-1">₹12.8L</h3>
           </div>
           <div className="flex gap-2 mt-4">
              <div className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-gold w-[65%]"></div>
              </div>
              <span className="text-[10px] font-bold text-white uppercase">Silver Partner</span>
           </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gold/10 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gold/5 flex justify-between items-center">
            <h3 className="font-display text-2xl font-bold text-navy">Settlement Ledger</h3>
            <button 
              onClick={() => onAction('Exporting Financial Report')}
              className="px-4 py-2 bg-ivory text-navy rounded-xl text-xs font-bold hover:bg-gold/10 transition-all"
            >
              Download GST Invoices
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-ivory/50 text-[10px] uppercase tracking-widest font-bold text-navy/40">
                  <th className="px-8 py-4">Transaction ID</th>
                  <th className="px-8 py-4">Client</th>
                  <th className="px-8 py-4">Total Amount</th>
                  <th className="px-8 py-4">Commission</th>
                  <th className="px-8 py-4">Settlement</th>
                  <th className="px-8 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/5">
                {[
                  { id: 'TXN-9021', name: 'Aditi Sharma', total: '₹45,000', fee: '₹4,500', net: '₹40,500', status: 'Pending' },
                  { id: 'TXN-8842', name: 'Karan Mehra', total: '₹1,20,000', fee: '₹12,000', net: '₹1,08,000', status: 'Paid' },
                  { id: 'TXN-8761', name: 'Sameer Khan', total: '₹85,000', fee: '₹8,500', net: '₹76,500', status: 'Paid' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-ivory/20 transition-colors">
                    <td className="px-8 py-6 text-sm font-mono text-navy/40">{row.id}</td>
                    <td className="px-8 py-6 font-bold text-navy">{row.name}</td>
                    <td className="px-8 py-6 text-sm font-bold text-navy">{row.total}</td>
                    <td className="px-8 py-6 text-sm text-red-600">{row.fee}</td>
                    <td className="px-8 py-6 text-sm font-bold text-green-600">{row.net}</td>
                    <td className="px-8 py-6">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter ${
                        row.status === 'Pending' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'operations': return renderOperations();
      case 'finances': return renderFinances();
      case 'bookings':
        return (
          <div className="bg-white rounded-3xl border border-gold/10 shadow-sm overflow-hidden animate-fade-in-up">
            <div className="p-8 border-b border-gold/5 flex justify-between items-center">
              <h3 className="font-display text-2xl font-bold text-navy">Smart Booking Manager</h3>
              <div className="flex gap-2">
                 <button className="px-4 py-2 bg-navy text-white rounded-xl text-xs font-bold shadow-lg">Inbound Leads</button>
                 <button className="px-4 py-2 bg-ivory text-navy rounded-xl text-xs font-bold">Confirmed Events</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-ivory/50 text-[10px] uppercase tracking-widest font-bold text-navy/40">
                    <th className="px-8 py-4">Client Name</th>
                    <th className="px-8 py-4">Event Date</th>
                    <th className="px-8 py-4">Type</th>
                    <th className="px-8 py-4">Budget</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold/5">
                  {bookings.map((row, i) => (
                    <tr key={i} className="hover:bg-ivory/20 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 bg-champagne/30 rounded-full flex items-center justify-center font-bold text-navy">
                             {row.name.charAt(0)}
                           </div>
                           <span className="font-bold text-navy">{row.name}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-sm text-navy/60">{row.date}</td>
                      <td className="px-8 py-6 text-sm text-navy/60">{row.type}</td>
                      <td className="px-8 py-6 text-sm font-bold text-navy">{row.budget}</td>
                      <td className="px-8 py-6">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter ${
                          row.status === 'Pending' ? 'bg-orange-50 text-orange-600' : 
                          row.status === 'Rejected' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex gap-2">
                           <button onClick={() => onAction(`Chat with ${row.name}`)} className="p-2 bg-ivory text-navy rounded-lg hover:bg-gold/20 transition-all">💬</button>
                           <button onClick={() => onAction(`Call ${row.name}`)} className="p-2 bg-ivory text-navy rounded-lg hover:bg-gold/20 transition-all">📞</button>
                           {row.status === 'Pending' && (
                             <>
                              <button onClick={() => handleBookingAction(row.id, 'Confirmed')} className="px-3 py-2 bg-navy text-white text-[10px] font-bold rounded-lg hover:bg-navy/80 shadow-md">Accept</button>
                              <button onClick={() => handleBookingAction(row.id, 'Rejected')} className="px-3 py-2 bg-red-100 text-red-600 text-[10px] font-bold rounded-lg hover:bg-red-200">Reject</button>
                             </>
                           )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'reputation':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in-up">
             <div className="lg:col-span-4 space-y-8">
                <div className="bg-white p-8 rounded-3xl border border-gold/10 shadow-sm text-center">
                   <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy/40 mb-6">Aggregate Rating</h3>
                   <div className="text-6xl font-bold text-navy mb-4">4.9<span className="text-2xl text-gold">★</span></div>
                   <p className="text-xs text-navy/50 mb-8">Based on {reviews.length} verified reviews</p>
                   <div className="space-y-3">
                      {[5, 4, 3, 2, 1].map(s => (
                        <div key={s} className="flex items-center gap-3">
                           <span className="text-[10px] font-bold w-4">{s}★</span>
                           <div className="flex-1 h-1.5 bg-ivory rounded-full overflow-hidden">
                              <div className="h-full bg-gold" style={{ width: s === 5 ? '85%' : s === 4 ? '10%' : '5%' }}></div>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="bg-champagne/30 p-8 rounded-3xl border border-gold/10">
                   <h4 className="font-bold text-navy mb-4">Reputation Tips</h4>
                   <p className="text-xs text-navy/60 leading-relaxed italic">"Responding to negative reviews within 24 hours can boost your trust score by up to 15 points."</p>
                </div>
             </div>
             <div className="lg:col-span-8 bg-white p-8 rounded-3xl border border-gold/10 shadow-sm">
                <div className="flex justify-between items-center mb-10">
                   <h3 className="font-display text-2xl font-bold text-navy">Customer Feedback</h3>
                   <button 
                    onClick={() => onAction('Auto-Reply Bot Enabled')}
                    className="text-[10px] font-bold text-gold uppercase tracking-widest hover:underline"
                   >
                     Enable Auto-Reply Mode
                   </button>
                </div>
                <div className="space-y-8">
                   {reviews.map((rev, i) => (
                     <div key={i} className="pb-8 border-b border-gold/5 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start mb-4">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-ivory rounded-full flex items-center justify-center font-bold text-navy">{rev.name.charAt(0)}</div>
                              <div>
                                 <h4 className="font-bold text-navy text-sm">{rev.name} <span className="text-[10px] text-navy/30 font-medium ml-2">{rev.type}</span></h4>
                                 <div className="flex gap-0.5 mt-1">
                                    {[...Array(5)].map((_, i) => <span key={i} className={`text-sm ${i < rev.rating ? 'text-gold' : 'text-navy/10'}`}>★</span>)}
                                 </div>
                              </div>
                           </div>
                           <span className="text-[10px] font-bold text-navy/30">{rev.date}</span>
                        </div>
                        <p className="text-sm text-navy/70 leading-relaxed mb-4">{rev.text}</p>
                        
                        {rev.reply ? (
                          <div className="ml-8 p-4 bg-navy/5 border-l-4 border-gold rounded-r-xl">
                            <p className="text-[10px] font-bold text-gold uppercase tracking-widest mb-1">Your Response</p>
                            <p className="text-xs text-navy/60 italic">"{rev.reply}"</p>
                          </div>
                        ) : (
                          <div className="mt-4 flex flex-col gap-2">
                            <textarea 
                              placeholder="Type your reply..."
                              className="w-full p-3 text-xs bg-ivory border-none rounded-xl focus:ring-1 focus:ring-gold resize-none"
                              value={replyText[rev.id] || ''}
                              onChange={(e) => setReplyText(prev => ({ ...prev, [rev.id]: e.target.value }))}
                            />
                            <div className="flex gap-4">
                              <button 
                                onClick={() => handleReviewReply(rev.id)}
                                className="text-[10px] font-bold text-navy bg-gold/10 px-4 py-1.5 rounded-lg hover:bg-gold transition-all"
                              >
                                Send Reply
                              </button>
                              <button className="text-[10px] font-bold text-navy/40 hover:text-navy transition-colors">Report Spam</button>
                            </div>
                          </div>
                        )}
                     </div>
                   ))}
                </div>
             </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 bg-ivory">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="font-display text-4xl font-bold text-navy">Partner OS</h1>
              <span className="bg-navy text-champagne text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">Premium Pro</span>
            </div>
            <p className="text-navy/50 text-sm font-medium">Monitoring business health for <span className="text-navy font-bold">Lux Venue Mumbai</span></p>
          </div>
          
          <div className="flex items-center gap-4 relative">
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-3 bg-white border border-gold/10 rounded-2xl hover:bg-gold/5 transition-all group"
            >
              <svg className="w-6 h-6 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
              <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 border-2 border-white rounded-full group-hover:animate-ping"></span>
            </button>

            {isNotificationsOpen && (
              <div className="absolute top-16 right-0 w-80 bg-white rounded-3xl shadow-2xl border border-gold/10 z-[70] p-6 animate-fade-in-up">
                <div className="flex justify-between items-center mb-6">
                   <h4 className="font-bold text-navy">Urgent Alerts</h4>
                   <button onClick={() => setIsNotificationsOpen(false)} className="text-navy/20 hover:text-navy">✕</button>
                </div>
                <div className="space-y-4 mb-6">
                  {[
                    { id: 1, type: 'urgent', text: 'New Booking Request for 12th Dec!', time: '2m ago' },
                    { id: 2, type: 'info', text: 'Your payout of ₹42,500 is being processed.', time: '1h ago' },
                    { id: 3, type: 'warning', text: 'Complete your GST KYC to avoid delays.', time: '3h ago' },
                  ].map(n => (
                    <div key={n.id} className="p-4 bg-ivory/50 rounded-2xl hover:bg-gold/5 transition-all group cursor-pointer" onClick={() => onAction(`Handling Notification: ${n.text}`)}>
                       <p className={`text-xs font-bold mb-1 ${n.type === 'urgent' ? 'text-red-600' : 'text-navy'}`}>{n.text}</p>
                       <span className="text-[10px] text-navy/30">{n.time}</span>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => onAction('Viewing All Alerts')}
                  className="w-full py-3 bg-navy text-white text-[10px] font-bold rounded-xl shadow-lg"
                >
                  View All Notifications
                </button>
              </div>
            )}

            <button 
              onClick={() => onAction('Opening Manual Entry Form')}
              className="px-8 py-3 bg-navy text-white rounded-2xl font-bold shadow-xl hover:-translate-y-1 transition-all flex items-center gap-3"
            >
              <span>+</span>
              <span>Manual Entry</span>
            </button>
          </div>
        </div>

        <div className="flex gap-1 md:gap-4 p-1.5 bg-white/60 backdrop-blur-sm rounded-2xl border border-gold/10 overflow-x-auto scrollbar-hide">
          {(['overview', 'bookings', 'operations', 'finances', 'reputation'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex-shrink-0 ${
                activeTab === tab ? 'bg-navy text-white shadow-xl scale-105' : 'text-navy/40 hover:text-navy hover:bg-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {renderContent()}

        <div className="bg-gold/5 rounded-[2.5rem] p-10 border border-gold/20 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex gap-6 items-center">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm">🎧</div>
              <div>
                 <h4 className="font-display text-2xl font-bold text-navy">Partner Support</h4>
                 <p className="text-navy/50 text-sm">Facing issues with a client or settlement? We're here to help 24/7.</p>
              </div>
           </div>
           <div className="flex gap-4">
              <button onClick={() => onAction('Help Desk Opened')} className="px-8 py-4 bg-white border border-gold/20 text-navy font-bold rounded-2xl hover:bg-white transition-all shadow-sm">Raise a Ticket</button>
              <button onClick={() => onAction('Calling Relationship Manager')} className="px-8 py-4 bg-navy text-white font-bold rounded-2xl hover:bg-navy/90 transition-all shadow-lg">Call RM</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
