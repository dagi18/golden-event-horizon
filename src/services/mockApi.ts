
import { format, addDays, subDays } from 'date-fns';

// Types
export interface Event {
  id: string;
  name: string;
  date: string;
  dateEnd?: string;
  location: string;
  status: 'published' | 'draft' | 'approved' | 'overview';
  guests: number;
  maxGuests: number;
  description?: string;
}

export interface Guest {
  id: string;
  name: string;
  organization: string;
  jobTitle: string;
  contact: { phone: string; email: string };
  eventId: string;
  registered: string;
  status: 'registered' | 'checked-in' | 'no-show';
}

export interface Vendor {
  id: string;
  name: string;
  contact: { phone: string; email: string };
  tinNumber: string;
  contactPersons: number;
  created: string;
}

export interface Approval {
  id: string;
  name: string;
  type: 'event' | 'vendor';
  description: string;
  date: string;
  location: string;
  maxGuests: number;
  createdOn: string;
  status: 'draft' | 'pending';
}

export interface StatsSummary {
  totalEvents: number;
  totalGrowth: number;
  upcomingEvents: number;
  nextEventDays: number;
  registeredGuests: number;
  guestsGrowth: number;
  badgesPrinted: number;
  badgesPercentage: number;
}

// Mock data generator
const today = new Date();
const formatDate = (date: Date): string => format(date, 'MMM d, yyyy');

// Mock events data
const events: Event[] = [
  {
    id: '1',
    name: 'Annual Tech Conference',
    date: format(addDays(today, 30), 'MMM dd, yyyy') + ' - ' + format(addDays(today, 32), 'MMM dd, yyyy'),
    location: 'Convention Center',
    status: 'published',
    guests: 120,
    maxGuests: 200,
    description: 'Join us for the biggest tech conference of the year featuring keynotes, workshops, and networking opportunities.'
  },
  {
    id: '2',
    name: 'Product Launch',
    date: format(addDays(today, 13), 'MMM dd, yyyy'),
    location: 'Grand Hotel',
    status: 'approved',
    guests: 75,
    maxGuests: 100,
    description: 'Exclusive product launch event for our newest innovation.'
  },
  {
    id: '3',
    name: 'Marketing Workshop',
    date: format(addDays(today, 25), 'MMM dd, yyyy') + ' - ' + format(addDays(today, 26), 'MMM dd, yyyy'),
    location: 'Business Center',
    status: 'draft',
    guests: 30,
    maxGuests: 50,
    description: 'Learn the latest marketing strategies and techniques.'
  },
  {
    id: '4',
    name: 'Charity Gala',
    date: format(addDays(today, 65), 'MMM dd, yyyy'),
    location: 'Luxury Hotel',
    status: 'overview',
    guests: 0,
    maxGuests: 300,
    description: 'Annual fundraising gala for local charities.'
  },
  {
    id: '5',
    name: 'Team Building Retreat',
    date: format(addDays(today, 80), 'MMM dd, yyyy') + ' - ' + format(addDays(today, 82), 'MMM dd, yyyy'),
    location: 'Mountain Resort',
    status: 'draft',
    guests: 0,
    maxGuests: 40,
    description: 'Company retreat focused on team building and strategy.'
  }
];

// Mock guests data
const guests: Guest[] = [
  {
    id: '1',
    name: 'Jane Smith',
    organization: 'Acme Inc',
    jobTitle: 'CTO',
    contact: { 
      phone: '+1 (555) 123-4567', 
      email: 'jane.smith@example.com' 
    },
    eventId: '1',
    registered: format(subDays(today, 4), 'MMM d, yyyy'),
    status: 'registered'
  },
  {
    id: '2',
    name: 'John Doe',
    organization: 'Tech Solutions',
    jobTitle: 'Developer',
    contact: { 
      phone: '+1 (555) 234-5678', 
      email: 'john.doe@example.com' 
    },
    eventId: '1',
    registered: format(subDays(today, 5), 'MMM d, yyyy'),
    status: 'checked-in'
  },
  {
    id: '3',
    name: 'Alice Johnson',
    organization: 'Marketing Pro',
    jobTitle: 'CMO',
    contact: { 
      phone: '+1 (555) 345-6789', 
      email: 'alice.johnson@example.com' 
    },
    eventId: '2',
    registered: format(subDays(today, 6), 'MMM d, yyyy'),
    status: 'registered'
  },
  {
    id: '4',
    name: 'Bob Williams',
    organization: 'Design Studio',
    jobTitle: 'Designer',
    contact: { 
      phone: '+1 (555) 456-7890', 
      email: 'bob.williams@example.com' 
    },
    eventId: '2',
    registered: format(subDays(today, 7), 'MMM d, yyyy'),
    status: 'no-show'
  },
  {
    id: '5',
    name: 'Carol Brown',
    organization: 'Finance Corp',
    jobTitle: 'CFO',
    contact: { 
      phone: '+1 (555) 567-8901', 
      email: 'carol.brown@example.com' 
    },
    eventId: '3',
    registered: format(subDays(today, 8), 'MMM d, yyyy'),
    status: 'checked-in'
  }
];

// Mock vendors data
const vendors: Vendor[] = [
  {
    id: '1',
    name: 'TechEvents Inc.',
    contact: { 
      phone: '+1 (555) 123-4567', 
      email: 'contact@techevents.com' 
    },
    tinNumber: '12-3456789',
    contactPersons: 2,
    created: format(subDays(today, 34), 'MMM d, yyyy')
  },
  {
    id: '2',
    name: 'Conference Solutions',
    contact: { 
      phone: '+1 (555) 234-5678', 
      email: 'info@conferencesolutions.com' 
    },
    tinNumber: '23-4567890',
    contactPersons: 1,
    created: format(subDays(today, 29), 'MMM d, yyyy')
  },
  {
    id: '3',
    name: 'Event Masters',
    contact: { 
      phone: '+1 (555) 345-6789', 
      email: 'hello@eventmasters.com' 
    },
    tinNumber: '34-5678901',
    contactPersons: 3,
    created: format(subDays(today, 25), 'MMM d, yyyy')
  },
  {
    id: '4',
    name: 'Global Events',
    contact: { 
      phone: '+1 (555) 456-7890', 
      email: 'support@globalevents.com' 
    },
    tinNumber: '45-6789012',
    contactPersons: 2,
    created: format(subDays(today, 20), 'MMM d, yyyy')
  }
];

// Mock approvals data
const approvals: Approval[] = [
  {
    id: '1',
    name: 'Annual Tech Conference',
    type: 'event',
    description: 'Join us for the biggest tech conference of the year featuring keynotes, workshops, and networking opportunities.',
    date: format(addDays(today, 30), 'MMM dd, yyyy') + ' - ' + format(addDays(today, 32), 'MMM dd, yyyy'),
    location: 'Convention Center, 123 Main St, City',
    maxGuests: 200,
    createdOn: format(subDays(today, 7), 'MMM d, yyyy'),
    status: 'draft'
  },
  {
    id: '2',
    name: 'Product Launch',
    type: 'event',
    description: 'Exclusive product launch event for our newest innovation.',
    date: format(addDays(today, 13), 'MMM dd, yyyy'),
    location: 'Grand Hotel, Downtown',
    maxGuests: 100,
    createdOn: format(subDays(today, 14), 'MMM d, yyyy'),
    status: 'pending'
  }
];

// Stats for dashboard
const stats: StatsSummary = {
  totalEvents: 12,
  totalGrowth: 2,
  upcomingEvents: 4,
  nextEventDays: 3,
  registeredGuests: 342,
  guestsGrowth: 28,
  badgesPrinted: 289,
  badgesPercentage: 83.1
};

// Analytics data
export const analyticsData = {
  attendance: {
    jan: 120,
    feb: 235,
    mar: 180,
    apr: 305,
    may: 285,
  },
  guestTypes: {
    new: 65,
    returning: 35,
  },
};

// API service
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API service
export const mockApi = {
  // Events
  getEvents: async (): Promise<Event[]> => {
    await delay(500);
    return [...events];
  },
  
  getEvent: async (id: string): Promise<Event | undefined> => {
    await delay(300);
    return events.find(event => event.id === id);
  },
  
  // Guests
  getGuests: async (): Promise<Guest[]> => {
    await delay(500);
    return [...guests];
  },
  
  getGuestsByEvent: async (eventId: string): Promise<Guest[]> => {
    await delay(300);
    return guests.filter(guest => guest.eventId === eventId);
  },
  
  // Vendors
  getVendors: async (): Promise<Vendor[]> => {
    await delay(500);
    return [...vendors];
  },
  
  // Approvals
  getApprovals: async (): Promise<Approval[]> => {
    await delay(500);
    return [...approvals];
  },
  
  // Dashboard stats
  getStats: async (): Promise<StatsSummary> => {
    await delay(300);
    return { ...stats };
  },
  
  // Analytics
  getAnalytics: async () => {
    await delay(500);
    return { ...analyticsData };
  }
};
