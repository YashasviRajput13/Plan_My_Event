
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './views/LandingPage';
import PlannerWizard from './views/PlannerWizard';
import UserDashboard from './views/UserDashboard';
import VendorDashboard from './views/VendorDashboard';
import VendorPartner from './views/VendorPartner';
import SearchResults from './views/SearchResults';
import Login from './views/Login';
import AIAssistant from './components/AIAssistant';
import { AppState } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    view: 'landing',
    user: { name: '', role: null },
    filters: {}
  });

  const [notification, setNotification] = useState<string | null>(null);
  const [plannedEvent, setPlannedEvent] = useState<any>(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = (msg: string) => setNotification(msg);

  const handleStartPlanning = (heroData?: { type: string, city: string }) => {
    setState({ 
      ...state, 
      view: 'wizard',
      filters: heroData ? { type: heroData.type as any, city: heroData.city } : {}
    });
    window.scrollTo(0, 0);
  };

  const handlePartnerWithUs = () => {
    setState({ ...state, view: 'vendor-partner' });
    window.scrollTo(0, 0);
  };

  const handleWizardComplete = (data: any) => {
    setPlannedEvent(data);
    setState({ 
      ...state, 
      view: 'dashboard', 
      user: { name: 'Demo User', role: 'user' } 
    });
    window.scrollTo(0, 0);
    showNotification("Event plan generated successfully!");
  };

  const handleNavigate = (view: AppState['view'] | string) => {
    if (view === 'how-it-works') {
      const element = document.getElementById('how-it-works-section');
      element?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (view === 'pricing') {
      if (state.view !== 'vendor-partner') {
        setState(prev => ({ ...prev, view: 'vendor-partner' }));
        setTimeout(() => {
          const element = document.getElementById('pricing-section');
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.getElementById('pricing-section');
        element?.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    if (view === 'vendors') {
      setState({ ...state, view: 'search-results', filters: {} });
      window.scrollTo(0, 0);
      return;
    }

    if (view === 'logout') {
      setState({ ...state, view: 'landing', user: { name: '', role: null } });
      showNotification("Logged out successfully.");
      return;
    }

    if (view === 'vendor-dashboard') {
      setState(prev => ({ ...prev, view: 'vendor-dashboard', user: { name: 'Lux Venue', role: 'vendor' } }));
    } else {
      setState({ ...state, view: view as AppState['view'] });
    }
    window.scrollTo(0, 0);
  };

  const handleLogin = (role: 'user' | 'vendor') => {
    const name = role === 'user' ? 'Demo Planner' : 'Lux Venue';
    setState({ 
      ...state, 
      view: role === 'user' ? 'dashboard' : 'vendor-dashboard', 
      user: { name, role } 
    });
    showNotification(`Logged in as ${name}`);
  };

  const handleCategoryClick = (category: string) => {
    setState({ 
      ...state, 
      view: 'search-results', 
      filters: { category } 
    });
    window.scrollTo(0, 0);
    showNotification(`Filtering for ${category}...`);
  };

  const renderView = () => {
    switch (state.view) {
      case 'landing':
        return (
          <LandingPage 
            onStartPlanning={handleStartPlanning} 
            onPartnerWithUs={handlePartnerWithUs}
            onExplore={() => handleNavigate('search-results')}
            onCategoryClick={handleCategoryClick}
          />
        );
      case 'search-results':
        return (
          <SearchResults 
            initialCity={state.filters?.city} 
            initialCategory={state.filters?.category}
            onBook={(v) => showNotification(`Booking initialized for ${v.name}. Opening secure payment...`)}
          />
        );
      case 'login':
        return (
          <Login 
            onLogin={handleLogin} 
            onCancel={() => handleNavigate('landing')} 
          />
        );
      case 'wizard':
        return (
          <PlannerWizard 
            initialData={state.filters as any}
            onComplete={handleWizardComplete} 
            onCancel={() => handleNavigate('landing')} 
          />
        );
      case 'dashboard':
        return plannedEvent ? (
          <UserDashboard 
            eventData={plannedEvent} 
            onAdjustBudget={() => handleNavigate('wizard')}
            onExploreVendors={() => handleNavigate('search-results')}
          />
        ) : (
          <LandingPage 
            onStartPlanning={handleStartPlanning} 
            onPartnerWithUs={handlePartnerWithUs}
            onExplore={() => handleNavigate('search-results')}
            onCategoryClick={handleCategoryClick}
          />
        );
      case 'vendor-dashboard':
        return (
          <VendorDashboard 
            onAction={(action) => showNotification(`${action} functionality initiated.`)}
          />
        );
      case 'vendor-partner':
        return (
          <VendorPartner 
            onJoin={() => {
              handleNavigate('vendor-dashboard');
              showNotification("Welcome aboard! Your trial has started.");
            }} 
          />
        );
      default:
        return <LandingPage onStartPlanning={handleStartPlanning} onPartnerWithUs={handlePartnerWithUs} onExplore={() => {}} onCategoryClick={handleCategoryClick} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Global Notification */}
      {notification && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-navy text-champagne px-8 py-4 rounded-full shadow-2xl font-bold animate-fade-in-up border border-gold/30">
          {notification}
        </div>
      )}

      <Navbar 
        onNavigate={handleNavigate} 
        userRole={state.user.role} 
      />
      <main className="flex-grow">
        {renderView()}
      </main>
      <Footer onNavigate={handleNavigate} />
      
      {/* AI Voice Assistant */}
      <AIAssistant />
    </div>
  );
};

export default App;
