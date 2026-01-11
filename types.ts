
export type EventType = 'Wedding' | 'Corporate' | 'Birthday' | 'Engagement' | 'Anniversary' | 'Concert';

export interface Vendor {
  id: string;
  name: string;
  category: 'Banquet' | 'Caterer' | 'Decorator' | 'Photographer' | 'DJ' | string;
  priceRange: string;
  rating: number;
  location: string;
  image: string;
  verified: boolean;
  featured?: boolean;
  trustScore: number; // 0-100 score
  reliabilityPercent: number;
  priceTransparency: 'Verified' | 'Estimated';
}

export interface ChecklistItem {
  id: string;
  task: string;
  category: string;
  completed: boolean;
  priority: 'High' | 'Medium' | 'Low';
  timeline: string;
}

export interface UserSession {
  name: string;
  role: 'user' | 'vendor' | null;
}

export interface AppState {
  view: 'landing' | 'wizard' | 'dashboard' | 'vendor-dashboard' | 'search-results' | 'vendor-partner' | 'login';
  user: UserSession;
  filters?: {
    city?: string;
    category?: string;
    type?: EventType;
  };
  selectedEvent?: {
    type: EventType;
    budget: number;
    city: string;
    date: string;
    vision: string;
  };
}
