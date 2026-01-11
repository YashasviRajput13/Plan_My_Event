
import { Vendor, EventType } from './types';

export const CITIES = ['Mumbai', 'Delhi NCR', 'Bangalore', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata', 'Jaipur'];

export const EVENT_TYPES: EventType[] = ['Wedding', 'Corporate', 'Birthday', 'Engagement', 'Anniversary', 'Concert'];

export const SERVICE_CATEGORIES = [
  { id: 'DJ', label: 'DJ ARTIST', icon: '🎧' },
  { id: 'Planner', label: 'PLANNER', icon: '📅' },
  { id: 'Decorator', label: 'DECORATOR', icon: '✨' },
  { id: 'Photographer', label: 'PHOTOGRAPHER', icon: '📸' },
  { id: 'Caterer', label: 'CATERER', icon: '🍽️' },
];

export const MOCK_VENDORS: Vendor[] = [
  {
    id: 'v1',
    name: 'The Grand Imperial',
    category: 'Banquet',
    priceRange: '₹2,00,000 - ₹5,00,000',
    rating: 4.9,
    location: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800',
    verified: true,
    featured: true,
    trustScore: 98,
    reliabilityPercent: 99,
    priceTransparency: 'Verified'
  },
  {
    id: 'v2',
    name: 'Royal Cravings',
    category: 'Caterer',
    priceRange: '₹800 - ₹2,500 / Plate',
    rating: 4.8,
    location: 'Delhi NCR',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800',
    verified: true,
    trustScore: 92,
    reliabilityPercent: 95,
    priceTransparency: 'Verified'
  },
  {
    id: 'v3',
    name: 'Eternal Blooms',
    category: 'Decorator',
    priceRange: '₹50,000 - ₹3,00,000',
    rating: 4.7,
    location: 'Bangalore',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800',
    verified: true,
    featured: true,
    trustScore: 88,
    reliabilityPercent: 90,
    priceTransparency: 'Verified'
  },
  {
    id: 'v4',
    name: 'Snapshot Studios',
    category: 'Photographer',
    priceRange: '₹40,000 - ₹1,50,000',
    rating: 4.9,
    location: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800',
    verified: true,
    trustScore: 95,
    reliabilityPercent: 97,
    priceTransparency: 'Verified'
  },
  {
    id: 'v5',
    name: 'Beat Drop Pro',
    category: 'DJ',
    priceRange: '₹25,000 - ₹80,000',
    rating: 4.6,
    location: 'Pune',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800',
    verified: false,
    trustScore: 72,
    reliabilityPercent: 85,
    priceTransparency: 'Estimated'
  },
  {
    id: 'v6',
    name: 'The Jaipur Palace',
    category: 'Banquet',
    priceRange: '₹3,50,000 - ₹8,00,000',
    rating: 4.9,
    location: 'Jaipur',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800',
    verified: true,
    featured: true,
    trustScore: 96,
    reliabilityPercent: 98,
    priceTransparency: 'Verified'
  },
  {
    id: 'v7',
    name: 'Spice Route Catering',
    category: 'Caterer',
    priceRange: '₹1,200 - ₹3,500 / Plate',
    rating: 4.7,
    location: 'Hyderabad',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800',
    verified: true,
    trustScore: 90,
    reliabilityPercent: 92,
    priceTransparency: 'Verified'
  },
  {
    id: 'v8',
    name: 'Lumiere Cinematic',
    category: 'Photographer',
    priceRange: '₹60,000 - ₹2,00,000',
    rating: 4.8,
    location: 'Delhi NCR',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=800',
    verified: true,
    featured: true,
    trustScore: 94,
    reliabilityPercent: 96,
    priceTransparency: 'Verified'
  },
  {
    id: 'v9',
    name: 'Vibrant Vibes Decor',
    category: 'Decorator',
    priceRange: '₹75,000 - ₹4,50,000',
    rating: 4.6,
    location: 'Chennai',
    image: 'https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&q=80&w=800',
    verified: true,
    trustScore: 85,
    reliabilityPercent: 88,
    priceTransparency: 'Verified'
  },
  {
    id: 'v10',
    name: 'Resonance Live',
    category: 'DJ',
    priceRange: '₹35,000 - ₹1,20,000',
    rating: 4.9,
    location: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&q=80&w=800',
    verified: true,
    featured: true,
    trustScore: 97,
    reliabilityPercent: 99,
    priceTransparency: 'Verified'
  },
  {
    id: 'v11',
    name: 'Heritage Lawns',
    category: 'Banquet',
    priceRange: '₹1,50,000 - ₹4,00,000',
    rating: 4.5,
    location: 'Kolkata',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800',
    verified: true,
    trustScore: 82,
    reliabilityPercent: 85,
    priceTransparency: 'Verified'
  },
  {
    id: 'v12',
    name: 'Coastal Flavors',
    category: 'Caterer',
    priceRange: '₹900 - ₹2,000 / Plate',
    rating: 4.7,
    location: 'Chennai',
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&q=80&w=800',
    verified: true,
    trustScore: 89,
    reliabilityPercent: 91,
    priceTransparency: 'Estimated'
  }
];
