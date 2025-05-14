
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Users, Printer } from 'lucide-react';
import { mockApi, StatsSummary, Event } from '../services/mockApi';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<StatsSummary | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [statsData, eventsData] = await Promise.all([
          mockApi.getStats(),
          mockApi.getEvents(),
        ]);
        setStats(statsData);
        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Render different content based on user role
  const renderDashboardContent = () => {
    if (user?.role === 'usher') {
      return (
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Your Assigned Events</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {events.slice(0, 2).map((event) => (
              <div key={event.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 border border-gray-200 dark:border-gray-700">
                <h3 className="font-medium text-lg">{event.name}</h3>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">{event.date}</div>
                <div className="flex items-center text-sm mb-2 justify-center">
                  <Calendar size={16} className="mr-2" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <span className={`status-pill status-${event.status}`}>
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </span>
                  </div>
                  <Link
                    to={`/events/${event.id}/check-in`}
                    className="text-gold hover:text-gold-dark text-sm font-medium"
                  >
                    Check in guests →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // Admin and Organizer see similar dashboard but with different permissions
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Events</div>
                <div className="text-2xl font-bold mt-1">{stats?.totalEvents || 0}</div>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded">
                <Calendar size={20} className="text-blue-600 dark:text-blue-500" />
              </div>
            </div>
            <div className="text-xs text-green-600 dark:text-green-400 flex items-center mt-2">
              <span>+{stats?.totalGrowth || 0} from last month</span>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Upcoming Events</div>
                <div className="text-2xl font-bold mt-1">{stats?.upcomingEvents || 0}</div>
              </div>
              <div className="bg-yellow-100 dark:bg-yellow-900/20 p-2 rounded">
                <Clock size={20} className="text-yellow-600 dark:text-yellow-500" />
              </div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Next event in {stats?.nextEventDays || 0} days
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Registered Guests</div>
                <div className="text-2xl font-bold mt-1">{stats?.registeredGuests || 0}</div>
              </div>
              <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded">
                <Users size={20} className="text-green-600 dark:text-green-500" />
              </div>
            </div>
            <div className="text-xs text-green-600 dark:text-green-400 flex items-center mt-2">
              <span>+{stats?.guestsGrowth || 0} this week</span>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Badges Printed</div>
                <div className="text-2xl font-bold mt-1">{stats?.badgesPrinted || 0}</div>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded">
                <Printer size={20} className="text-purple-600 dark:text-purple-500" />
              </div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {stats?.badgesPercentage || 0}% of registered guests
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <div className="p-5 border-b border-gray-200 dark:border-gray-700">
              <h2 className="font-semibold">Upcoming Events</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Your next events scheduled in the coming weeks</p>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {events.slice(0, 3).map((event) => (
                <div key={event.id} className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{event.name}</h3>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{event.date} • {event.location}</div>
                    </div>
                    <div className="flex items-center">
                      <Users size={16} className="mr-1" />
                      <span className="text-sm font-medium">{event.guests}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 text-center border-t border-gray-200 dark:border-gray-700">
              <Link to="/events" className="text-gold hover:text-gold-dark text-sm font-medium">
                View all events →
              </Link>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <div className="p-5 border-b border-gray-200 dark:border-gray-700">
              <h2 className="font-semibold">Recent Registrations</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Latest guest registrations across all events</p>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              <div className="p-5">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">Jane Smith</h3>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Acme Inc</div>
                  </div>
                  <div className="text-right text-sm text-gray-500 dark:text-gray-400">5/10/2025</div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">John Doe</h3>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Tech Solutions</div>
                  </div>
                  <div className="text-right text-sm text-gray-500 dark:text-gray-400">5/9/2025</div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">Alice Johnson</h3>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Marketing Pro</div>
                  </div>
                  <div className="text-right text-sm text-gray-500 dark:text-gray-400">5/8/2025</div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">Bob Williams</h3>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Design Studio</div>
                  </div>
                  <div className="text-right text-sm text-gray-500 dark:text-gray-400">5/7/2025</div>
                </div>
              </div>
            </div>
            <div className="p-4 text-center border-t border-gray-200 dark:border-gray-700">
              <Link to="/guests" className="text-gold hover:text-gold-dark text-sm font-medium">
                View all guests →
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="text-center">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Welcome back, {user?.name}!
        </p>
      </header>
      
      {renderDashboardContent()}
    </div>
  );
};

export default Dashboard;
