
import React, { useState } from 'react';
import { Printer, RotateCcw, Search, Check, QrCode } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

interface Guest {
  id: string;
  name: string;
  company: string;
  jobTitle: string;
  event: string;
  isPrinted: boolean;
}

// Mock data for badges
const initialGuests: Guest[] = [
  {
    id: '1',
    name: 'First1 Last1',
    company: 'Company A',
    jobTitle: 'Manager',
    event: 'Annual Tech Conference 2025',
    isPrinted: true
  },
  {
    id: '2',
    name: 'First2 Last2',
    company: 'Company B',
    jobTitle: 'Director',
    event: 'Marketing Summit',
    isPrinted: false
  },
  {
    id: '3',
    name: 'First3 Last3',
    company: 'Company C',
    jobTitle: 'VP',
    event: 'Product Launch',
    isPrinted: false
  },
  {
    id: '4',
    name: 'First4 Last4',
    company: 'Company D',
    jobTitle: 'CEO',
    event: 'Annual Tech Conference 2025',
    isPrinted: false
  },
  {
    id: '5',
    name: 'First5 Last5',
    company: 'Company E',
    jobTitle: 'Specialist',
    event: 'Marketing Summit',
    isPrinted: true
  },
  {
    id: '6',
    name: 'First6 Last6',
    company: 'Company F',
    jobTitle: 'Coordinator',
    event: 'Product Launch',
    isPrinted: false
  },
  {
    id: '7',
    name: 'First7 Last7',
    company: 'Company G',
    jobTitle: 'Manager',
    event: 'Annual Tech Conference 2025',
    isPrinted: false
  },
  {
    id: '8',
    name: 'First8 Last8',
    company: 'Company H',
    jobTitle: 'Director',
    event: 'Marketing Summit',
    isPrinted: false
  }
];

const PrintBadges: React.FC = () => {
  const [guests, setGuests] = useState<Guest[]>(initialGuests);
  const [selectedGuests, setSelectedGuests] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  
  const filteredGuests = guests.filter(guest => 
    guest.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    guest.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.event.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelectGuest = (id: string) => {
    if (selectedGuests.includes(id)) {
      setSelectedGuests(selectedGuests.filter(guestId => guestId !== id));
    } else {
      setSelectedGuests([...selectedGuests, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedGuests.length === filteredGuests.length) {
      setSelectedGuests([]);
    } else {
      setSelectedGuests(filteredGuests.map(guest => guest.id));
    }
  };

  const handlePrint = () => {
    if (selectedGuests.length === 0) {
      toast({
        title: "No badges selected",
        description: "Please select at least one guest to print a badge.",
        variant: "destructive",
      });
      return;
    }

    // Update printed status
    const updatedGuests = guests.map(guest => {
      if (selectedGuests.includes(guest.id)) {
        return { ...guest, isPrinted: true };
      }
      return guest;
    });
    
    setGuests(updatedGuests);
    
    toast({
      title: "Badges sent to printer",
      description: `${selectedGuests.length} badge(s) have been sent to the printer.`,
    });
    
    // Clear selection after printing
    setSelectedGuests([]);
  };

  const resetFilters = () => {
    setSearchTerm('');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Print Badges</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Select an event and search for guests to print badges
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium mb-4">Filter Guests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Event</label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white">
                <option value="">Select an event</option>
                <option>Annual Tech Conference 2025</option>
                <option>Marketing Summit</option>
                <option>Product Launch</option>
              </select>
            </div>
            
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Search</label>
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, phone or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing {filteredGuests.length} guests
            </div>
            
            <button
              onClick={resetFilters}
              className="inline-flex items-center px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <RotateCcw size={14} className="mr-1" />
              Reset Filters
            </button>
          </div>
        </div>
        
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedGuests.length === filteredGuests.length && filteredGuests.length > 0}
                        onChange={toggleSelectAll}
                        className="h-4 w-4 rounded border-gray-300 text-gold focus:ring-gold dark:bg-gray-700"
                      />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Company</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Job Title</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Event</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredGuests.map((guest) => (
                  <tr key={guest.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedGuests.includes(guest.id)}
                        onChange={() => toggleSelectGuest(guest.id)}
                        className="h-4 w-4 rounded border-gray-300 text-gold focus:ring-gold dark:bg-gray-700"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900 dark:text-white">{guest.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {guest.company}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {guest.jobTitle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {guest.event}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`status-pill ${guest.isPrinted ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'}`}>
                        {guest.isPrinted ? 'Printed' : 'Not Printed'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button
                        onClick={() => {
                          // Individual print action
                          toast({
                            title: "Badge preview",
                            description: `Showing preview for ${guest.name}'s badge`,
                          });
                        }}
                        className="text-gold hover:text-gold-dark font-medium"
                      >
                        Print
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {selectedGuests.length} guests selected
            </div>
            
            <button
              onClick={handlePrint}
              disabled={selectedGuests.length === 0}
              className={`inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white ${
                selectedGuests.length > 0 ? 'bg-gold hover:bg-gold-dark' : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              <Printer size={18} className="mr-2" />
              Print Selected ({selectedGuests.length})
            </button>
          </div>
        </div>
      </div>
      
      {/* Badge Preview Section */}
      {selectedGuests.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-medium mb-4">Badge Preview</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedGuests.slice(0, 1).map(id => {
              const guest = guests.find(g => g.id === id);
              if (!guest) return null;
              
              return (
                <div key={guest.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md">
                  <div className="bg-gold p-4 text-white text-center">
                    <h3 className="font-bold text-xl">{guest.event}</h3>
                  </div>
                  
                  <div className="p-6 flex flex-col items-center justify-center space-y-3">
                    <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                      <span className="text-2xl">{guest.name.charAt(0)}</span>
                    </div>
                    
                    <div className="text-center">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">{guest.name}</h4>
                      <p className="text-gray-600 dark:text-gray-400">{guest.jobTitle}</p>
                      <p className="text-gray-500 dark:text-gray-500">{guest.company}</p>
                    </div>
                    
                    <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 p-2 rounded-md flex items-center justify-center">
                      <QrCode size={80} />
                    </div>
                    
                    <p className="text-xs text-gray-400">ID: {guest.id}</p>
                  </div>
                </div>
              );
            })}
            
            {selectedGuests.length > 1 && (
              <div className="border border-dashed border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden flex items-center justify-center p-6">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <span className="block font-medium text-lg mb-1">+{selectedGuests.length - 1} more badge(s)</span>
                  <span className="block text-sm">Click print to generate all selected badges</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PrintBadges;
